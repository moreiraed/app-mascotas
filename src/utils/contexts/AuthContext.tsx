import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  hasSeenWelcome?: boolean;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (identifier: string, password: string) => Promise<{ success: boolean; message?: string; isNewUser?: boolean }>;
  signOut: () => Promise<void>;
  register: (userData: Omit<User, 'id'>) => Promise<{ success: boolean; message?: string }>;
  currentUserId: string | null;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; message?: string }>;
  resetPassword: (email: string, newPassword: string) => Promise<{ success: boolean; message?: string }>;
  marcarWelcomeComoVisto: () => Promise<void>;
  userVisitoWelcome: () => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => ({ success: false, message: 'Sistema no inicializado' }),
  signOut: async () => {},
  register: async () => ({ success: false, message: 'Sistema no inicializado' }),
  currentUserId: null,
  requestPasswordReset: async () => ({ success: false, message: 'Sistema no inicializado' }),
  resetPassword: async () => ({ success: false, message: 'Sistema no inicializado' }),
  marcarWelcomeComoVisto: async () => {},
  userVisitoWelcome: async () => false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('currentUser');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          // Migración para usuarios existentes que no tienen hasSeenWelcome
          if (user.hasSeenWelcome === undefined) {
            user.hasSeenWelcome = true; // Usuarios existentes ya han visto el welcome
            await AsyncStorage.setItem('currentUser', JSON.stringify(user));
            
            // Actualizar también en la lista de usuarios
            const storedUsers = await AsyncStorage.getItem('users');
            const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
            const userIndex = users.findIndex(u => u.id === user.id);
            if (userIndex !== -1) {
              users[userIndex] = user;
              await AsyncStorage.setItem('users', JSON.stringify(users));
            }
          }
          setUser(user);
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

      const newUser = { ...userData, id: Date.now().toString(), hasSeenWelcome: false };
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
        // Migración para usuarios existentes que no tienen userVisitoWelcome
        if (foundUser.hasSeenWelcome === undefined) {
          foundUser.hasSeenWelcome = true; // Usuarios existentes ya han visto el welcome
          
          // Actualizar en la lista de usuarios
          const userIndex = users.findIndex(u => u.id === foundUser.id);
          if (userIndex !== -1) {
            users[userIndex] = foundUser;
            await AsyncStorage.setItem('users', JSON.stringify(users));
          }
        }
        
        await AsyncStorage.setItem('currentUser', JSON.stringify(foundUser));
        setUser(foundUser);
        return { 
          success: true, 
          isNewUser: !foundUser.hasSeenWelcome 
        };
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

  // Función para solicitar el restablecimiento de contraseña
  const requestPasswordReset = async (email: string) => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
      const userExists = users.some(u => u.email === email);

      if (!userExists) {
        return { success: false, message: 'No existe una cuenta con este email' };
      }

      // Si el usuario existe, almacenar el email en AsyncStorage
      // para usarlo en el proceso de restablecimiento
      await AsyncStorage.setItem('resetPasswordEmail', email);

      return { success: true, message: 'Hemos encontrado tu email' };
    } catch (error) {
      console.error('Password reset request error:', error);
      return { success: false, message: 'Error al solicitar recuperación' };
    }
  };

  // Función para actualizar la contraseña del usuario
  const resetPassword = async (email: string, newPassword: string) => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
      const userIndex = users.findIndex(u => u.email === email);

      if (userIndex === -1) {
        return { success: false, message: 'Usuario no encontrado' };
      }

      users[userIndex].password = newPassword;

      await AsyncStorage.setItem('users', JSON.stringify(users));
      await AsyncStorage.removeItem('resetPasswordEmail');

      return { success: true, message: 'Contraseña actualizada correctamente' };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, message: 'Error al actualizar contraseña' };
    }
  };

  // Función para marcar que el usuario ya vio el welcome
  const marcarWelcomeComoVisto = async () => {
    try {
      if (user) {
        const updatedUser = { ...user, hasSeenWelcome: true };
        await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        // Actualizar también en la lista de usuarios
        const storedUsers = await AsyncStorage.getItem('users');
        const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
          users[userIndex] = updatedUser;
          await AsyncStorage.setItem('users', JSON.stringify(users));
        }
      }
    } catch (error) {
      console.error('Error al marcar welcome como visto:', error);
    }
  };

  // Función para verificar si el usuario ya vio el welcome
  const userVisitoWelcome = async (): Promise<boolean> => {
    try {
      if (user) {
        return user.hasSeenWelcome || false;
      }
      return false;
    } catch (error) {
      console.error('Error al comprobar el estado de welcome:', error);
      return false;
    }
  };

  return (
  <AuthContext.Provider value={{ 
    user, 
    isLoading, 
    signIn, 
    signOut, 
    register, 
    currentUserId: user?.id || null,
    requestPasswordReset,
    resetPassword,
    marcarWelcomeComoVisto,
    userVisitoWelcome
  }}>
    {children}
  </AuthContext.Provider>
);
};