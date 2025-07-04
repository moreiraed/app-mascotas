import React from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../styles/indexStyles'
import fontStyles from '@/src/styles/fontStyles';
import MainButtonLong from '../../components/MainButtonLong';
import SecondaryButtonLong from '../../components/SecondaryButton';

export default function AuthScreen() {
  const router = useRouter();
  const register = () => {
    router.push('/(auth)/register');
  }
  const login = () => {
    router.push('/(auth)/login');
  }

  return (
    <View style={styles.container}>
      <Text style={fontStyles.granTitulo}>MascotApp</Text>

      <Image
        source={require('@/src/assets/images/cat-and-dog.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={{width: '100%', gap: 10}}>
        <MainButtonLong title='Ingresar' onPress={login}></MainButtonLong>
        <SecondaryButtonLong title='Registrarse' onPress={register}></SecondaryButtonLong>
      </View>
    </View>
  );
}