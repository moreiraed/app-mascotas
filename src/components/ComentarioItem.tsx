import { View, Text, StyleSheet, Pressable } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Comentario } from '@/src/types/tipos';

interface ComentarioItemProps {
  comentario: Comentario;
  onLikePress?: () => void;
  onReplyPress?: () => void;
  nivel?: number; 
}

export default function ComentarioItem({ 
  comentario, 
  onLikePress, 
  onReplyPress,
  nivel = 0 
}: ComentarioItemProps) {
  return (
    <View style={[styles.contenedor, { marginLeft: nivel * 15 }]}>
      <View style={styles.cabecera}>
        <View style={styles.autorContainer}>
          <MaterialIcons name="account-circle" size={16} color="#444" />
          <Text style={styles.autor}>{comentario.autor.nombre}</Text>
        </View>
        <Text style={styles.fecha}>{new Date(comentario.fecha).toLocaleDateString()}</Text>
      </View>
      <Text style={styles.contenido}>{comentario.contenido}</Text>
      <View style={styles.acciones}>
        <Pressable onPress={onLikePress} style={styles.botonAccion}>
          <AntDesign name="like1" size={14} color="#666" />
          <Text style={styles.textoAccion}> {comentario.likes}</Text>
        </Pressable>
        <Pressable onPress={onReplyPress} style={styles.botonAccion}>
          <MaterialIcons name="reply" size={14} color="#666" />
          <Text style={styles.textoAccion}> Responder</Text>
        </Pressable>
      </View>
      
      {/* Renderizar respuestas si existen */}
      {comentario.respuestas?.map(respuesta => (
        <ComentarioItem 
          key={respuesta.id} 
          comentario={respuesta} 
          nivel={nivel + 1}
          onLikePress={onLikePress}
          onReplyPress={onReplyPress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
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
    marginBottom: 8,
  },
  acciones: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 15,
  },
  botonAccion: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoAccion: {
    color: '#666',
    fontSize: 14,
  },
});