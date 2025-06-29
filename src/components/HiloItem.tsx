import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { Hilo } from '@/src/types/tipos';

interface HiloItemProps {
  hilo: Hilo;
}

export default function HiloItem({ hilo }: HiloItemProps) {
  const router = useRouter();

  const navegarADetalle = () => {
    router.push({
      pathname: '/foro/hilo/[id]',
      params: { id: hilo.id }
    });
  };

  return (
    <Pressable 
      style={styles.contenedor}
      onPress={navegarADetalle}
    >
      <Text style={styles.titulo}>{hilo.titulo}</Text>
      <View style={styles.meta}>
        <View style={styles.autorContainer}>
          <MaterialIcons name="account-circle" size={16} color="#666" />
          <Text style={styles.autor}>Por {hilo.autor.nombre}</Text>
        </View>
        <Text style={styles.fecha}>
          {new Date(hilo.fecha).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </Text>
      </View>
      <Text style={styles.resumen} numberOfLines={2}>
        {hilo.contenido}
      </Text>
      <View style={styles.estadisticas}>
        <View style={styles.iconoContainer}>
          <MaterialIcons name="comment" size={16} color="#666" />
          <Text style={styles.estadisticaTexto}>{hilo.comentarios.length}</Text>
        </View>
        <View style={styles.iconoContainer}>
          <Feather name="thumbs-up" size={16} color="#666" />
          <Text style={styles.estadisticaTexto}>{hilo.likes}</Text>
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
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
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
});