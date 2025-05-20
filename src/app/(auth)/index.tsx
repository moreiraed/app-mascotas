import React from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../styles/indexStyles'
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
      <Text style={styles.title}>Nombre de la App</Text>

      <Image
        source={require('../../assets/images/cat-and-dog.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <MainButtonLong title='Ingresar' onPress={login}></MainButtonLong>
      <SecondaryButtonLong title='Registrarse' onPress={register}></SecondaryButtonLong>
    </View>
  );
}