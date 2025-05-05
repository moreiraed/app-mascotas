import { useEffect, useState } from 'react';
import { View, Text, Image, Button, Alert } from 'react-native';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import styles from '../../styles/permisosStyles';

export default function PermisosScreen() {
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  const pedirPermisos = async () => {
    // Solicita permiso de ubicación
    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
    setHasLocationPermission(locationStatus === 'granted');

    // Solicita permiso de cámara
    const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus === 'granted');

    if (locationStatus !== 'granted' || cameraStatus !== 'granted') {
      Alert.alert('Permisos requeridos', 'Necesitamos acceso a la ubicación y cámara para continuar.');
    } else {
      Alert.alert('¡Listo!', 'Todos los permisos fueron concedidos');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/permisos.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>
        Para continuar, necesitamos acceso a tu ubicación y cámara
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="Dar permisos" onPress={pedirPermisos} />
      </View>
    </View>
 );
}