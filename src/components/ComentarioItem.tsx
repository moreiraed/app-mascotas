import { View, Text, StyleSheet, Pressable } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Comentario } from '@/src/types/tipos';

interface ComentarioItemProps {
  comentario: Comentario;
  onLikePress?: () => void;
}

export default function ComentarioItem({ comentario, onLikePress }: ComentarioItemProps) {
  return (
    <View style={styles.contenedor}>
      <View style={styles.cabecera}>
        <View style={styles.autorContainer}>
          <MaterialIcons name="account-circle" size={16} color="#444" />
          <Text style={styles.autor}>{comentario.autor.nombre}</Text>
        </View>
        <Text style={styles.fecha}>{new Date(comentario.fecha).toLocaleDateString()}</Text>
      </View>
      <Text style={styles.contenido}>{comentario.contenido}</Text>
      <View style={styles.acciones}>
        <Pressable onPress={onLikePress} style={styles.botonLike}>
          <AntDesign name="like1" size={14} color="#666" />
          <Text style={styles.likes}> {comentario.likes}</Text>
        </Pressable>
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
  autorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  autor: {
    fontWeight: 'bold',
    color: '#444',
    marginLeft: 4,
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
  botonLike: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likes: {
    color: '#666',
    fontSize: 14,
  },
});