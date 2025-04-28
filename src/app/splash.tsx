import { useEffect } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import styles from '../styles/splashStyles'; // 👈 Importamos los estilos
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/'); // Ir al index después de 3 segundos
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Mi App 🚀</Text>
      <Image
        source={require('../assets/images/cat-dog-logo.png')} // Imagen opcional
        style={styles.image}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />
    </View>
  );
}