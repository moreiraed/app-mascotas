import { useState, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, Feather, Entypo } from '@expo/vector-icons';
import { Hilo } from '@/src/types/tipos';
import { useAuth } from '@/src/hooks/useAuth';
import { eliminarHilo } from '@/src/utils/almacen';

interface HiloItemProps {
  hilo: Hilo;
  onDelete?: () => void;
}

export default function HiloItem({ hilo, onDelete }: HiloItemProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const { id, titulo, autor, fecha, contenido, comentarios, likes } = hilo;
  const { id: userId, nombre: autorNombre } = autor;

  const navegarADetalle = useCallback(() => {
    router.push({ pathname: '/foro/hilo/[id]', params: { id } });
  }, [router, id]);

  const manejarEliminar = useCallback(async () => {
    setMenuVisible(false);
    Alert.alert(
      'Eliminar hilo',
      '¿Estás seguro de que quieres eliminar este hilo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: async () => {
            try {
              await eliminarHilo(id);
              onDelete?.();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el hilo');
            }
          },
        },
      ]
    );
  }, [id, onDelete]);

  // Comprobación si el usuario es el autor
  const esAutor = userId === user?.id;

  return (
    <Pressable style={styles.contenedor} onPress={navegarADetalle}>
      <View style={styles.cabecera}>
        <Text style={styles.titulo}>{titulo}</Text>
        
        {esAutor && (
          <Pressable 
            onPress={(e) => {
              e.stopPropagation();
              setMenuVisible((prev) => !prev);
            }}
            style={styles.botonMenu}
          >
            <Entypo name="dots-three-vertical" size={16} color="#666" />
          </Pressable>
        )}
      </View>

      {menuVisible && (
        <View style={styles.menuContextual}>
          <Pressable onPress={manejarEliminar} style={styles.opcionMenu}>
            <MaterialIcons name="delete" size={16} color="#FF3B30" />
            <Text style={styles.textoOpcionMenu}>Borrar hilo</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.meta}>
        <View style={styles.autorContainer}>
          <MaterialIcons name="account-circle" size={16} color="#666" />
          <Text style={styles.autor}>Por {autorNombre}</Text>
        </View>
        <Text style={styles.fecha}>
          {new Date(fecha).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </Text>
      </View>
      
      <Text style={styles.resumen} numberOfLines={2}>
        {contenido}
      </Text>
      
      <View style={styles.estadisticas}>
        <View style={styles.iconoContainer}>
          <MaterialIcons name="comment" size={16} color="#666" />
          <Text style={styles.estadisticaTexto}>{comentarios.length}</Text>
        </View>
        <View style={styles.iconoContainer}>
          <Feather name="thumbs-up" size={16} color="#666" />
          <Text style={styles.estadisticaTexto}>{likes}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    position: 'relative',
  },
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1, 
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  autorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  autor: {
    color: '#666',
    fontSize: 14,
    marginLeft: 4,
  },
  fecha: {
    color: '#999',
    fontSize: 12,
  },
  resumen: {
    color: '#444',
    marginBottom: 10,
    lineHeight: 20,
  },
  estadisticas: {
    flexDirection: 'row',
    gap: 15,
  },
  iconoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  estadisticaTexto: {
    color: '#666',
  },
  botonMenu: {
    padding: 5,
    marginLeft: 10,
  },
  menuContextual: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
    zIndex: 1,
    minWidth: 120,
  },
  opcionMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textoOpcionMenu: {
    marginLeft: 8,
    color: '#FF3B30',
  },
});