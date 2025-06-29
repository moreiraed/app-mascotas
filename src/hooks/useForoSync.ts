import { useEffect } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario } from '@/src/types/tipos';

// Clave para almacenar los datos del foro en AsyncStorage
const CLAVE_ALMACENAMIENTO_FORO = '@foro_data';

// Hook personalizado para sincronizar el usuario autenticado con los datos del foro
export const useForoSync = () => {
  const { user } = useAuth();

  useEffect(() => {
      // Función para sincronizar el usuario autenticado con el foro
      // Si el usuario no existe en el foro, lo agrega
    const sincronizarUsuarioConForo = async () => {
      // Si no hay usuario autenticado, no hacemos nada
      if (!user) return;

      try {
        // Obtenemos los datos actuales del foro
        const datosForoAlmacenados = await AsyncStorage.getItem(CLAVE_ALMACENAMIENTO_FORO);
        const datosForo = datosForoAlmacenados != null 
          ? JSON.parse(datosForoAlmacenados) 
          : { hilos: [], usuarios: [] };
        
        // Verificamos si el usuario ya está registrado en el foro
        const usuarioYaRegistrado = datosForo.usuarios.find(
          (usuario: Usuario) => usuario.id === user.id
        );
        
        // Si el usuario no existe en el foro, lo agregamos
        if (!usuarioYaRegistrado) {
          const nuevoUsuarioForo: Usuario = {
            id: user.id,
            nombre: user.username,
          };
          
          // Actualizamos la lista de usuarios del foro
          datosForo.usuarios.push(nuevoUsuarioForo);
          
          // Guardamos los datos actualizados
          await AsyncStorage.setItem(CLAVE_ALMACENAMIENTO_FORO, JSON.stringify(datosForo));
          
          console.log('Usuario sincronizado con el foro:', nuevoUsuarioForo);
        }
      } catch (error) {
        console.error('Error al sincronizar usuario con el foro:', error);
      }
    };

    // Ejecutamos la sincronización
    sincronizarUsuarioConForo();
  }, [user]); 

  return { user };
};