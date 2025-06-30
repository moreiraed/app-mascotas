import { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert } from 'react-native';
import MainButtonLong from '@/src/components/MainButtonLong';

interface FormularioComentarioProps {
  onSubmit: (contenido: string) => Promise<void>;
  onCancel?: () => void;
}

export default function FormularioComentario({ onSubmit, onCancel }: FormularioComentarioProps) {
  const [contenido, setContenido] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleEnviar = async () => {
    if (!contenido.trim()) {
      setError('El comentario no puede estar vacío');
      return;
    }
    
    setEnviando(true);
    try {
      await onSubmit(contenido);
      setContenido('');
      setError('');
    } catch (e) {
      Alert.alert('Error', 'No se pudo enviar el comentario');
      console.error('Error al enviar comentario:', e);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <View style={styles.contenedor}>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Escribe un comentario..."
        value={contenido}
        onChangeText={(text) => {
          setContenido(text);
          setError('');
        }}
        multiline
      />
      {error ? <Text style={styles.textoError}>{error}</Text> : null}
      
      <MainButtonLong
        title="Enviar"
        onPress={handleEnviar}
        loading={enviando}
        disabled={enviando}
      />
      
      {onCancel && (
        <View style={styles.botonCancelarContainer}>
          <MainButtonLong
            title="Cancelar"
            onPress={onCancel}
          />
        </View>
      )}
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
  inputError: {
    borderColor: 'red',
    backgroundColor: '#FFF0F0',
  },
  textoError: {
    color: 'red',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 5,
  },
  botonCancelarContainer: {
    marginTop: 10,
  },
});