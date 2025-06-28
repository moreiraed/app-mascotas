import { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

interface FormularioComentarioProps {
  onSubmit: (contenido: string) => Promise<void>;
}

export default function FormularioComentario({ onSubmit }: FormularioComentarioProps) {
  const [contenido, setContenido] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleEnviar = async () => {
    if (!contenido.trim()) return;
    
    setEnviando(true);
    try {
      await onSubmit(contenido);
      setContenido('');
    } catch (error) {
      console.error('Error al enviar comentario:', error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <View style={styles.contenedor}>
      <TextInput
        style={styles.input}
        placeholder="Escribe un comentario..."
        value={contenido}
        onChangeText={setContenido}
        multiline
      />
      <Pressable 
        style={[styles.boton, enviando && styles.botonDeshabilitado]} 
        onPress={handleEnviar}
        disabled={enviando}
      >
        <Text style={styles.textoBoton}>
          {enviando ? 'Enviando...' : 'Enviar'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    minHeight: 80,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  boton: {
    backgroundColor: '#FF9F00',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  botonDeshabilitado: {
    opacity: 0.5,
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
  },
});