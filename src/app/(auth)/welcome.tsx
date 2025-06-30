import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '@/src/styles/welcomeStyles'; 
import MainButtonShort from '@/src/components/MainButtonShort';
import fontStyles from '@/src/styles/fontStyles';
import { useAuth } from '@/src/hooks/useAuth';

export default function HomeScreen() {
  const router = useRouter();
  const { marcarWelcomeComoVisto } = useAuth();
  
  const continuar = async () => {
    // Marcar que el usuario ya vio el welcome
    await marcarWelcomeComoVisto();
    router.push('/(auth)/permisos');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Mi App</Text>

      <Text style={[fontStyles.textLight, styles.text]} >
        Juntos, podemos darles a los animales el hogar y el cariño que merecen.
      </Text>
      <Image
        source={require('../../assets/images/inicio.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <MainButtonShort title='Continuar' onPress={continuar}></MainButtonShort>
    </View>
  );
}