import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Comentario } from '@/src/types/tipos';

interface ComentarioItemProps {
  comentario: Comentario;
}

export default function ComentarioItem({ comentario }: ComentarioItemProps) {
  return (
    <View style={styles.contenedor}>
      <View style={styles.cabecera}>
        <Text style={styles.autor}>{comentario.autor.nombre}</Text>
        <Text style={styles.fecha}>{new Date(comentario.fecha).toLocaleDateString()}</Text>
      </View>
      <Text style={styles.contenido}>{comentario.contenido}</Text>
      <View style={styles.acciones}>
        <AntDesign name="like1" size={14} color="#666" />
        <Text style={styles.likes}> {comentario.likes}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
  },
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  autor: {
    fontWeight: 'bold',
    color: '#444',
  },
  fecha: {
    color: '#999',
    fontSize: 12,
  },
  contenido: {
    color: '#333',
    lineHeight: 20,
  },
  acciones: {
    flexDirection: 'row',
    marginTop: 10,
  },
  likes: {
    color: '#666',
    fontSize: 14,
  },
});