import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '@/src/styles/welcomeStyles'; 
import MainButtonShort from '@/src/components/MainButtonShort';
import fontStyles from '@/src/styles/fontStyles';

export default function HomeScreen() {
  const router = useRouter();
  const continuar = () => {
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