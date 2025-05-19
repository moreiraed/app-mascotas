import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import  {styles}  from '../../styles/permisosStyles';

export default function PermisosScreen() {
  const router = useRouter();
  const [isRequesting, setIsRequesting] = useState(false);

  const handlePermisos = async () => {
    setIsRequesting(true);

    try {
      // Solicitar permiso de ubicación
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();

      if (locationStatus !== 'granted') {
        Alert.alert('Permiso denegado', 'Se requiere acceso a la ubicación.');
        setIsRequesting(false);
        return;
      }

      // Solicitar permiso para acceder a la galería
      const { status: galleryStatus } = await MediaLibrary.requestPermissionsAsync();

      if (galleryStatus !== 'granted') {
        Alert.alert('Permiso denegado', 'Se requiere acceso a la galería.');
        setIsRequesting(false);
        return;
      }

      // Si ambos están concedidos, navegar al tab principal
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Error solicitando permisos:', error);
      Alert.alert('Error', 'Ocurrió un problema al solicitar los permisos.');
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/permisos.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>Necesitamos acceder a tu ubicación y galería</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handlePermisos}
        disabled={isRequesting}
      >
        <Text style={styles.buttonText}>
          {isRequesting ? 'Solicitando permisos...' : 'Dar permisos'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}