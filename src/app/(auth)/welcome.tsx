import { View, Text, Image, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import styles from '../../styles/welcomeStyles'; 
import { useRouter } from 'expo-router';
import MainButtonShort from '@/src/components/MainButtonShort';

export default function HomeScreen() {
  const router = useRouter();
  const continuar = () => {
    router.push('/(auth)/permisos');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Mi App</Text>

      <Image
        source={require('../../assets/images/inicio.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <MainButtonShort title='Continuar' onPress={continuar}></MainButtonShort>
    </View>
  );
}