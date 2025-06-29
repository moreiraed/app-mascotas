import { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { guardarHilo } from '@/src/utils/almacen';
import { useAuth } from '@/src/hooks/useAuth';
import { useForo } from '@/src/contexts/ForoContext';

export default function CrearHiloScreen() {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [errores, setErrores] = useState({
    titulo: '',
    contenido: ''
  });

  const { user } = useAuth();
  const { agregarHilo } = useForo();

  const validarCampos = () => {
    const nuevosErrores = {
      titulo: !titulo.trim() ? 'El título es requerido' : '',
      contenido: !contenido.trim() ? 'El contenido es requerido' : ''
    };
    setErrores(nuevosErrores);
    return !nuevosErrores.titulo && !nuevosErrores.contenido;
  };

  const handleEnviar = async () => {
    if (!validarCampos()) return;
    if (!user) {
      Alert.alert('Error', 'Debes estar autenticado para crear un hilo');
      return;
    }

    setEnviando(true);
    try {
      const autor = { id: user.id, nombre: user.username };
      const nuevoHilo = await guardarHilo({ titulo, contenido, autor });
      agregarHilo(nuevoHilo);
      router.back();
    } catch (error) {
      Alert.alert('Error', 'No se pudo publicar el hilo. Inténtalo nuevamente.');
      console.error('Error al crear hilo:', error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.titulo}>Nuevo hilo</Text>

      <TextInput
        style={[styles.input, errores.titulo ? styles.inputError : null]}
        placeholder="Título"
        value={titulo}
        onChangeText={(text) => {
          setTitulo(text);
          setErrores({ ...errores, titulo: '' });
        }}
        maxLength={100}
      />
      {errores.titulo ? <Text style={styles.textoError}>{errores.titulo}</Text> : null}

      <TextInput
        style={[styles.input, styles.areaTexto, errores.contenido ? styles.inputError : null]}
        placeholder="Contenido"
        value={contenido}
        onChangeText={(text) => {
          setContenido(text);
          setErrores({ ...errores, contenido: '' });
        }}
        multiline
        numberOfLines={8}
      />
      {errores.contenido ? <Text style={styles.textoError}>{errores.contenido}</Text> : null}

      <Pressable
        style={[styles.boton, enviando && styles.botonDeshabilitado]}
        onPress={handleEnviar}
        disabled={enviando}
      >
        <Text style={styles.textoBoton}>
          {enviando ? 'Publicando...' : 'Publicar'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    padding: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  areaTexto: {
    minHeight: 150,
    textAlignVertical: 'top',
  },
  boton: {
    backgroundColor: '#FF9F00',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  botonDeshabilitado: {
    opacity: 0.5,
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
    backgroundColor: '#FFF0F0',
  },
  textoError: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 5,
  },
});