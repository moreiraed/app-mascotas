import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import styles from '../styles/splashStyles';
import { useRouter } from 'expo-router'; // No necesitas Redirect aquí

export default function SplashScreen() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false); // Mantienes el estado si lo necesitas para otras cosas

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLogin) {
        router.replace('/(tabs)'); // Redirige a (tabs) si isLogin es true
      } else {
        router.replace('/(auth)'); // Redirige a (auth) si isLogin es false
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLogin]); // Agrega isLogin como dependencia para que el efecto se re-ejecute si cambia

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Mi App</Text>
      <Image
        source={require('../assets/images/cat-dog-logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />
    </View>
  );
}