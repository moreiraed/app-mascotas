import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { obtenerDatosForo, agregarComentario, darLikeHilo, darLikeComentario, responderComentario } from '@/src/utils/almacen';
import { Hilo } from '@/src/types/tipos';
import ComentarioItem from '@/src/components/ComentarioItem';
import FormularioComentario from '@/src/components/FormularioComentario';
import { useAuth } from '@/src/hooks/useAuth';

export default function PantallaHilo() {
  const { id } = useLocalSearchParams();
  const [hiloActual, setHiloActual] = useState<Hilo | null>(null);
  const [estaCargando, setEstaCargando] = useState(true);
  const { user } = useAuth();
  const [comentarioRespondiendo, setComentarioRespondiendo] = useState<string | null>(null);

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

  const manejarResponderComentario = async (contenido: string) => {
    if (!hiloActual || !user || !comentarioRespondiendo) return;

    try {
      const autorComentario = {
        id: user.id,
        nombre: user.username,
      };

      const comentarioAgregado = await responderComentario(
        hiloActual.id,
        comentarioRespondiendo,
        { contenido, autor: autorComentario }
      );

      setHiloActual({
        ...hiloActual,
        comentarios: hiloActual.comentarios.map(comentario =>
          comentario.id === comentarioRespondiendo
            ? { ...comentario, respuestas: [...(comentario.respuestas || []), comentarioAgregado] }
            : comentario
        ),
      });
      
      setComentarioRespondiendo(null); // Limpiar el estado de respuesta
    } catch (error) {
      console.error('Error al responder comentario:', error);
    }
  };

  const manejarLikeComentario = async (idComentario: string) => {
    if (!hiloActual) return;

    try {
      const totalLikes = await darLikeComentario(hiloActual.id, idComentario);

      // Actualizamos el estado local
      setHiloActual({
        ...hiloActual,
        comentarios: hiloActual.comentarios.map(comentario =>
          comentario.id === idComentario
            ? { ...comentario, likes: totalLikes }
            : comentario
        ),
      });
    } catch (error) {
      console.error('Error al dar like al comentario:', error);
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
        <View style={estilos.encabezadoHilo}>
          <View style={estilos.filaIconoTitulo}>
            <MaterialIcons name="account-circle" size={48} color="#444" style={estilos.iconoUsuario} />
            <View style={estilos.contenedorTitulo}>
              <Text style={estilos.titulo}>{hiloActual.titulo}</Text>
            </View>
          </View>

          <Text style={estilos.autor}>Publicado por {hiloActual.autor.nombre}</Text>
          <Text style={estilos.fecha}>
            {new Date(hiloActual.fecha).toLocaleDateString()}
          </Text>
        </View>

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
        renderItem={({ item }) => (
          <ComentarioItem
            comentario={item}
            onLikePress={() => manejarLikeComentario(item.id)}
            onReplyPress={() => setComentarioRespondiendo(item.id)} // Botón de respuesta
          />
        )}
        ItemSeparatorComponent={() => <View style={estilos.separador} />}
        ListEmptyComponent={
          <Text style={estilos.sinComentarios}>Sé el primero en comentar</Text>
        }
      />

      {comentarioRespondiendo ? (
        <View style={estilos.respuestaContainer}>
          <Text style={estilos.respuestaTexto}>Respondiendo a comentario...</Text>
          <FormularioComentario 
            onSubmit={manejarResponderComentario} 
            onCancel={() => setComentarioRespondiendo(null)}
          />
        </View>
      ) : (
        <FormularioComentario onSubmit={manejarNuevoComentario} />
      )}
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
  encabezadoHilo: {
    marginBottom: 15,
  },
  iconoUsuario: {
    marginRight: 10,
  },
  filaIconoTitulo: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 5,
  },
  textoEncabezado: {
    flex: 1,
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
  contenedorTitulo: {
  flex: 1,
  },
  respuestaContainer: {
    backgroundColor: '#f0f7ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  respuestaTexto: {
    color: '#0066cc',
    marginBottom: 8,
    fontStyle: 'italic',
  },
});