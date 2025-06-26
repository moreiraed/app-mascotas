import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function EditarPerfil() {
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const value = await AsyncStorage.getItem('username');
        if (value !== null) {
          setUsername(value.replace('@', ''));
        }
        const uri = await AsyncStorage.getItem('profileImage');
        if (uri) setProfileImage(uri);
      } catch (e) {
        // Manejar error
      }
    };
    loadProfile();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const saveProfile = async () => {
    const trimmed = username.trim();
    if (!trimmed) {
      Alert.alert('Error', 'El nombre de usuario no puede estar vacío.');
      return;
    }
    try {
      await AsyncStorage.setItem('username', '@' + trimmed);
      if (profileImage) {
        await AsyncStorage.setItem('profileImage', profileImage);
      }
      router.replace('/(tabs)/perfil');
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar el perfil.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar perfil</Text>
      <Image
        source={profileImage ? { uri: profileImage } : require('@/src/assets/images/icon.png')}
        style={styles.profileImage}
      />
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Cambiar foto de perfil</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Nuevo nombre de usuario"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={saveProfile}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => router.replace('/(tabs)/perfil')}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  profileImage: {
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
    marginBottom: 20,
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
