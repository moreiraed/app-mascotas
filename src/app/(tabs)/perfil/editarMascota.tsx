import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import imagePath from '@/src/constants/imagePath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { useAuth } from '@/src/hooks/useAuth';

export default function EditarMascota() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const imagePathMap = imagePath as Record<string, any>;
  const { currentUserId } = useAuth();

  const [nombre, setNombre] = useState(params.nombre as string || '');
  const [sexo, setSexo] = useState(params.sexo as string || '');
  const [color, setColor] = useState(params.color as string || '');
  const [edad, setEdad] = useState(params.edad as string || '');
  const [peso, setPeso] = useState(params.peso as string || '');
  const [imagen, setImagen] = useState(params.imagen as string || '');
  const [imagenUri, setImagenUri] = useState<string | null>(
    params.imagen && typeof params.imagen === 'string' &&
    (params.imagen.startsWith('http') || params.imagen.startsWith('file'))
      ? params.imagen
      : null
  );

  const [id] = useState((params.id as string) || Date.now().toString());

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const pickedUri = result.assets[0].uri;
      const fileName = pickedUri.split('/').pop();
      const docDir = FileSystem.documentDirectory;
      if (fileName && docDir) {
        const newPath = docDir + fileName;
        try {
          await FileSystem.copyAsync({ from: pickedUri, to: newPath });
          setImagenUri(newPath);
        } catch (e) {
          Alert.alert('Error', 'No se pudo guardar la imagen de la mascota.');
        }
      } else {
        setImagenUri(pickedUri); // fallback
      }
    }
  };

  const guardar = async () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre no puede estar vacío.');
      return;
    }
    if (!currentUserId) {
      Alert.alert('Error', 'No se pudo identificar al usuario.');
      return;
    }
    
    try {
      const mascotasRaw = await AsyncStorage.getItem(`mascotas_${currentUserId}`);
      let mascotas = mascotasRaw ? JSON.parse(mascotasRaw) : [];
      const index = mascotas.findIndex((m: any) => m.id === id);
      const imagenFinal = imagenUri ? imagenUri : imagen;
      const nuevaMascota = {
        id,
        nombre,
        sexo,
        color,
        edad,
        peso,
        imagen: imagenFinal,
      };
      if (index !== -1) {
        mascotas[index] = nuevaMascota;
      } else {
        mascotas.push(nuevaMascota);
      }
      await AsyncStorage.setItem(`mascotas_${currentUserId}`, JSON.stringify(mascotas));
      router.replace({
        pathname: '/(tabs)/perfil/PerfilMascota',
        params: nuevaMascota,
      });
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar la mascota.');
    }
  };

  // Determina qué imagen mostrar
  let imagenSource;
  if (imagenUri) {
    imagenSource = { uri: imagenUri };
  } else if (
    imagen &&
    typeof imagen === 'string' &&
    (imagen.startsWith('http') || imagen.startsWith('file'))
  ) {
    imagenSource = { uri: imagen };
  } else if (imagen) {
    imagenSource = imagePathMap[imagen];
  } else {
    imagenSource = imagePath.petAvatar;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar datos de la mascota</Text>
      <Image source={imagenSource} style={styles.petImage} />
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Cambiar foto</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre"
      />
      <TextInput
        style={styles.input}
        value={sexo}
        onChangeText={setSexo}
        placeholder="Sexo"
      />
      <TextInput
        style={styles.input}
        value={color}
        onChangeText={setColor}
        placeholder="Color"
      />
      <TextInput
        style={styles.input}
        value={edad}
        onChangeText={setEdad}
        placeholder="Edad"
      />
      <TextInput
        style={styles.input}
        value={peso}
        onChangeText={setPeso}
        placeholder="Peso"
      />
      <TouchableOpacity style={styles.button} onPress={guardar}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  petImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    backgroundColor: '#eee',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF9F00',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#FF9F00',
    fontSize: 16,
  },
}); 