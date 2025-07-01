import { View, Text, Image, TouchableOpacity, Alert, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import  {styles}  from '../../styles/permisosStyles';


export default function PermisosScreen() {
  const router = useRouter();
  const [isRequesting, setIsRequesting] = useState(false);
  const [permissionsStatus, setPermissionsStatus] = useState({
    location: 'undetermined',
    mediaLibrary: 'undetermined'
  });

  // Verificar el estado actual de los permisos al cargar la pantalla
  useEffect(() => {
    checkPermissionsStatus();
  }, []);

  const checkPermissionsStatus = async () => {
    try {
      const locationStatus = await Location.getForegroundPermissionsAsync();
      const mediaLibraryStatus = await ImagePicker.getMediaLibraryPermissionsAsync();
      
      setPermissionsStatus({
        location: locationStatus.status,
        mediaLibrary: mediaLibraryStatus.status
      });

      // Si ambos permisos ya están concedidos, navegar directamente
      if (locationStatus.status === 'granted' && mediaLibraryStatus.status === 'granted') {
        router.replace('/(tabs)/encontrar');
      }
    } catch (error) {
      console.error('Error verificando permisos:', error);
    }
  };

  const handlePermisos = async () => {
    setIsRequesting(true);

    try {
      let locationStatus = permissionsStatus.location;
      let mediaLibraryStatus = permissionsStatus.mediaLibrary;

      // Solicitar permiso de ubicación si no está concedido
      if (locationStatus !== 'granted') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        locationStatus = status;
        setPermissionsStatus(prev => ({ ...prev, location: status }));
        
        if (status !== 'granted') {
          Alert.alert(
            'Permiso de ubicación denegado', 
            'Esta app necesita acceso a la ubicación para mostrar mascotas perdidas cerca de ti. Puedes habilitarlo en Configuración > Privacidad > Ubicación.',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Ir a Configuración', onPress: () => Linking.openSettings() }
            ]
          );
          setIsRequesting(false);
          return;
        }
      }

      // Solicitar permiso para acceder a la galería si no está concedido
      if (mediaLibraryStatus !== 'granted') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        mediaLibraryStatus = status;
        setPermissionsStatus(prev => ({ ...prev, mediaLibrary: status }));
        
        if (status !== 'granted') {
          Alert.alert(
            'Permiso de galería denegado', 
            'Esta app necesita acceso a la galería para que puedas subir fotos de tus mascotas. Puedes habilitarlo en Configuración > Privacidad > Fotos.',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Ir a Configuración', onPress: () => Linking.openSettings() }
            ]
          );
          setIsRequesting(false);
          return;
        }
      }

      // Si ambos están concedidos, navegar al tab principal
      if (locationStatus === 'granted' && mediaLibraryStatus === 'granted') {
        router.replace('/(tabs)/encontrar');
      }
    } catch (error) {
      console.error('Error solicitando permisos:', error);
      Alert.alert('Error', 'Ocurrió un problema al solicitar los permisos. Por favor, intenta de nuevo.');
    } finally {
      setIsRequesting(false);
    }
  };

  const getButtonText = () => {
    if (isRequesting) return 'Solicitando permisos...';
    
    const hasLocation = permissionsStatus.location === 'granted';
    const hasMediaLibrary = permissionsStatus.mediaLibrary === 'granted';
    
    if (hasLocation && hasMediaLibrary) {
      return 'Permisos concedidos';
    } else if (hasLocation || hasMediaLibrary) {
      return 'Conceder permisos';
    } else {
      return 'Dar permisos';
    }
  };

  const isButtonDisabled = () => {
    return isRequesting || (permissionsStatus.location === 'granted' && permissionsStatus.mediaLibrary === 'granted');
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
        style={[styles.button, isButtonDisabled() && { opacity: 0.6 }]}
        onPress={handlePermisos}
        disabled={isButtonDisabled()}
      >
        <Text style={styles.buttonText}>
          {getButtonText()}
        </Text>
      </TouchableOpacity>
    </View>
  );
}