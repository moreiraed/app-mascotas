import { View, Text, Image, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import styles from '../../styles/welcomeStyles'; 
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Mi App</Text>

      <Image
        source={require('../../assets/images/inicio.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Botón personalizado */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/permisos')}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}