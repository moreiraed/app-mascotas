import AsyncStorage from '@react-native-async-storage/async-storage';
import { ForoState, Hilo, Comentario } from '@/src/types/tipos';

// Clave para almacenar los datos del foro en AsyncStorage
const CLAVE_ALMACENAMIENTO_FORO = '@foro_data';

// Obtiene todos los datos del foro desde el almacenamiento local
export const obtenerDatosForo = async (): Promise<ForoState> => {
  try {
    const datosAlmacenados = await AsyncStorage.getItem(CLAVE_ALMACENAMIENTO_FORO);
    // Si hay datos, los parseamos, sino retornamos estructura vacía
    return datosAlmacenados != null 
      ? JSON.parse(datosAlmacenados) 
      : { hilos: [], usuarios: [] };
  } catch (error) {
    console.error('Error al obtener datos del foro:', error);
    // En caso de error, retornamos estructura vacía
    return { hilos: [], usuarios: [] };
  }
};


// Guarda un nuevo hilo en el foro
export const guardarHilo = async (datosNuevoHilo: Omit<Hilo, 'id' | 'fecha' | 'comentarios' | 'likes'>): Promise<Hilo> => {
  try {
    const estadoActualForo = await obtenerDatosForo();
    
    // Creamos el objeto hilo completo con los campos adicionales
    const hiloCompleto: Hilo = {
      ...datosNuevoHilo,
      id: Date.now().toString(), // ID basado en timestamp
      fecha: new Date().toISOString(), // Fecha actual
      comentarios: [], // Array vacío de comentarios
      likes: 0, // Contador de likes inicializado en 0
    };
    
    // Añadimos el nuevo hilo al principio del array
    estadoActualForo.hilos.unshift(hiloCompleto);
    
    // Guardamos el estado actualizado
    await AsyncStorage.setItem(CLAVE_ALMACENAMIENTO_FORO, JSON.stringify(estadoActualForo));
    
    return hiloCompleto;
  } catch (error) {
    console.error('Error al guardar hilo:', error);
    throw error;
  }
};


// Agrega un comentario a un hilo existente 
export const agregarComentario = async (
  idHilo: string, 
  datosComentario: Omit<Comentario, 'id' | 'fecha' | 'likes'>
): Promise<Comentario> => {
  try {
    const estadoActualForo = await obtenerDatosForo();
    
    // Buscamos el índice del hilo donde agregaremos el comentario
    const indiceHilo = estadoActualForo.hilos.findIndex(hilo => hilo.id === idHilo);
    
    if (indiceHilo === -1) {
      throw new Error('Hilo no encontrado');
    }
    
    // Creamos el comentario completo con campos adicionales
    const comentarioCompleto: Comentario = {
      ...datosComentario,
      id: Date.now().toString(), // ID basado en timestamp
      fecha: new Date().toISOString(), // Fecha actual
      likes: 0 // Contador de likes inicializado en 0
    };
    
    // Agregamos el comentario al hilo correspondiente
    estadoActualForo.hilos[indiceHilo].comentarios.push(comentarioCompleto);
    
    // Guardamos el estado actualizado
    await AsyncStorage.setItem(CLAVE_ALMACENAMIENTO_FORO, JSON.stringify(estadoActualForo));
    
    return comentarioCompleto;
  } catch (error) {
    console.error('Error al agregar comentario:', error);
    throw error;
  }
};

// Incrementa el contador de likes de un hilo 
export const darLikeHilo = async (idHilo: string): Promise<number> => {
  try {
    const estadoActualForo = await obtenerDatosForo();
    
    // Buscamos el hilo específico
    const hilo = estadoActualForo.hilos.find(hilo => hilo.id === idHilo);
    
    if (!hilo) {
      throw new Error('Hilo no encontrado');
    }
    
    // Incrementamos los likes
    hilo.likes += 1;
    
    // Guardamos el estado actualizado
    await AsyncStorage.setItem(CLAVE_ALMACENAMIENTO_FORO, JSON.stringify(estadoActualForo));
    
    return hilo.likes;
  } catch (error) {
    console.error('Error al dar like:', error);
    throw error;
  }
};

export const darLikeComentario = async (idHilo: string, idComentario: string): Promise<number> => {
  try {
    const estadoActualForo = await obtenerDatosForo();
    
    // Buscamos el hilo específico
    const hilo = estadoActualForo.hilos.find(hilo => hilo.id === idHilo);
    
    if (!hilo) {
      throw new Error('Hilo no encontrado');
    }
    
    // Buscamos el comentario específico
    const comentario = hilo.comentarios.find(c => c.id === idComentario);
    
    if (!comentario) {
      throw new Error('Comentario no encontrado');
    }
    
    // Incrementamos los likes
    comentario.likes += 1;
    
    // Guardamos el estado actualizado
    await AsyncStorage.setItem(CLAVE_ALMACENAMIENTO_FORO, JSON.stringify(estadoActualForo));
    
    return comentario.likes;
  } catch (error) {
    console.error('Error al dar like al comentario:', error);
    throw error;
  }
};