import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (identifier: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signOut: () => Promise<void>;
  register: (userData: Omit<User, 'id'>) => Promise<{ success: boolean; message?: string }>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => ({ success: false, message: 'Sistema no inicializado' }),
  signOut: async () => {},
  register: async () => ({ success: false, message: 'Sistema no inicializado' }),
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('currentUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const register = async (userData: Omit<User, 'id'>) => {
    try {
      const existingUsers = await AsyncStorage.getItem('users');
      const users = existingUsers ? JSON.parse(existingUsers) : [];
      
      // Verificar si el usuario o email ya existen
      if (users.some((u: User) => u.email === userData.email)) {
        return { success: false, message: 'El email ya está registrado' };
      }
      if (users.some((u: User) => u.username === userData.username)) {
        return { success: false, message: 'El nombre de usuario ya existe' };
      }

      const newUser = { ...userData, id: Date.now().toString() };
      await AsyncStorage.setItem('users', JSON.stringify([...users, newUser]));
      await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
      setUser(newUser);
      
      return { success: true, message: 'Registro exitoso' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Error al registrar' };
    }
  };

  // Función para iniciar sesión
  // Permite iniciar sesión con email o nombre de usuario y contraseña
  const signIn = async (identifier: string, password: string) => {
    try {
      setIsLoading(true);
      const storedUsers = await AsyncStorage.getItem('users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
      
      const foundUser = users.find(u => 
        (u.email === identifier || u.username === identifier) && 
        u.password === password
      );
      
      // Si se encuentra el usuario, se guarda en AsyncStorage y se actualiza el estado
      if (foundUser) {
        await AsyncStorage.setItem('currentUser', JSON.stringify(foundUser));
        setUser(foundUser);
        return { success: true };
      }
      
      // Si no se encuentra el usuario o la contraseña es incorrecta, se retorna un mensaje adecuado
      const userExists = users.some(u => u.email === identifier || u.username === identifier);
      return { 
        success: false, 
        message: userExists ? 'Contraseña incorrecta' : 'Usuario no encontrado' 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Error al iniciar sesión' };
    } finally {
      setIsLoading(false);
    }
  };

  // Función para cerrar sesión
  // Elimina el usuario actual de AsyncStorage y actualiza el estado
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut, register }}>
      {children}
    </AuthContext.Provider>
  );
};