import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { obtenerDatosForo, agregarComentario, darLikeHilo } from '@/src/utils/almacen';
import { Hilo } from '@/src/types/tipos';
import ComentarioItem from '@/src/components/ComentarioItem';
import FormularioComentario from '@/src/components/FormularioComentario';
import { useAuth } from '@/src/hooks/useAuth';


export default function PantallaHilo() {
  const { id } = useLocalSearchParams();
  const [hiloActual, setHiloActual] = useState<Hilo | null>(null);
  const [estaCargando, setEstaCargando] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const cargarDatosHilo = async () => {
      try {
        const datosForo = await obtenerDatosForo();
        const hiloEncontrado = datosForo.hilos.find(hilo => hilo.id === id);
        setHiloActual(hiloEncontrado || null);
      } catch (error) {
        console.error('Error al cargar hilo:', error);
      } finally {
        setEstaCargando(false);
      }
    };
    
    cargarDatosHilo();
  }, [id]);

  const manejarLike = async () => {
    if (!hiloActual) return;
    
    try {
      const totalLikes = await darLikeHilo(hiloActual.id);
      setHiloActual({ ...hiloActual, likes: totalLikes });
    } catch (error) {
      console.error('Error al dar like:', error);
    }
  };

  const manejarNuevoComentario = async (contenido: string) => {
    if (!hiloActual || !user) return;
    
    try {
      const autorComentario = { 
        id: user.id, 
        nombre: user.username,
        avatar: undefined
      };
      
      const comentarioAgregado = await agregarComentario(
        hiloActual.id, 
        { contenido, autor: autorComentario }
      );
      
      setHiloActual({
        ...hiloActual,
        comentarios: [...hiloActual.comentarios, comentarioAgregado],
      });
    } catch (error) {
      console.error('Error al agregar comentario:', error);
      throw error;
    }
  };

  if (estaCargando) {
    return (
      <View style={estilos.centrado}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!hiloActual) {
    return (
      <View style={estilos.centrado}>
        <Text>No se encontró el hilo solicitado</Text>
      </View>
    );
  }

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.seccionHilo}>
        <Text style={estilos.titulo}>{hiloActual.titulo}</Text>
        <Text style={estilos.autor}>Publicado por {hiloActual.autor.nombre}</Text>
        <Text style={estilos.fecha}>
          {new Date(hiloActual.fecha).toLocaleDateString()}
        </Text>
        
        <Text style={estilos.contenido}>{hiloActual.contenido}</Text>
        
        <View style={estilos.contenedorAcciones}>
          <Pressable 
            onPress={manejarLike} 
            style={estilos.botonLike}
            accessibilityLabel="Dar like al hilo"
          >
            <AntDesign name="like1" size={14} color="#666" />
            <Text style={estilos.textoLikes}>{hiloActual.likes}</Text>
          </Pressable>
        </View>
      </View>
      
      <Text style={estilos.subtitulo}>
        Comentarios ({hiloActual.comentarios.length})
      </Text>
      
      <FlatList
        data={hiloActual.comentarios}
        keyExtractor={(comentario) => comentario.id}
        renderItem={({ item }) => <ComentarioItem comentario={item} />}
        ItemSeparatorComponent={() => <View style={estilos.separador} />}
        ListEmptyComponent={
          <Text style={estilos.sinComentarios}>Sé el primero en comentar</Text>
        }
      />
      
      <FormularioComentario onSubmit={manejarNuevoComentario} />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  seccionHilo: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  autor: {
    color: '#666',
    marginBottom: 3,
    fontSize: 14,
  },
  fecha: {
    color: '#999',
    fontSize: 12,
    marginBottom: 10,
  },
  contenido: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#444',
  },
  contenedorAcciones: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botonLike: {
    flexDirection: 'row',  
    alignItems: 'center',  
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
  },
  textoLikes: {
    marginLeft: 5,
    color: '#666',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  separador: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
  },
  sinComentarios: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
    fontStyle: 'italic',
  },
});