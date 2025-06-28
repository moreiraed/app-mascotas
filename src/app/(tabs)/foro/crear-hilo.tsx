import { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { guardarHilo } from '@/src/utils/almacen';
import { useAuth } from '@/src/hooks/useAuth';
import { useForo } from '@/src/contexts/ForoContext';

export default function CrearHiloScreen() {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [enviando, setEnviando] = useState(false);
  const { user } = useAuth();
  const { agregarHilo } = useForo();

  const handleEnviar = async () => {
    if (!titulo.trim() || !contenido.trim()) return;
    if (!user) {
      console.error('Usuario no autenticado');
      return;
    }
    
    setEnviando(true);
    try {
      const autor = { 
        id: user.id, 
        nombre: user.username,
        avatar: undefined // Puedes agregar avatar si lo tienes en el usuario
      };
      const nuevoHilo = await guardarHilo({ titulo, contenido, autor });
      agregarHilo(nuevoHilo);
      router.back();
    } catch (error) {
      console.error('Error al crear hilo:', error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Text style={styles.titulo}>Nuevo hilo</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
        maxLength={100}
      />
      
      <TextInput
        style={[styles.input, styles.areaTexto]}
        placeholder="Contenido"
        value={contenido}
        onChangeText={setContenido}
        multiline
        numberOfLines={8}
      />
      
      <Pressable 
        style={[styles.boton, enviando && styles.botonDeshabilitado]} 
        onPress={handleEnviar}
        disabled={enviando}
      >
        <Text style={styles.textoBoton}>
          {enviando ? 'Enviando...' : 'Publicar'}
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
});