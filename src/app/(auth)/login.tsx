import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/loginStyles'
import MainButtonLong from '@/src/components/MainButtonLong';
import SecondaryButtonLong from '@/src/components/SecondaryButton';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const ingresar = () => {
    router.push('/(auth)/welcome');
  }
  const registrarse = () => {
    router.push('/(auth)/register');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Haz vuelto!</Text>
      <Text style={styles.subtitle}>Ingresa tus datos para iniciar sesión</Text>

      <Text style={styles.label}>Correo</Text>
      <TextInput
        placeholder="Correo Electrónico"
        placeholderTextColor="#888"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Contraseña</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#888"
          style={styles.input}
          secureTextEntry={!showPassword}
        />
        <Pressable
          style={styles.eyeButton}
          onPress={() => setShowPassword(prev => !prev)}
        >
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#888"
          />
        </Pressable>
      </View>

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotText}>¿Olvidó su contraseña?</Text>
      </TouchableOpacity>

      <MainButtonLong title='Ingresar' onPress={ingresar}></MainButtonLong>

      <Text style={styles.registerPrompt}>¿No tienes cuenta?</Text>
      
      <SecondaryButtonLong title='Registrarse' onPress={registrarse}></SecondaryButtonLong>
    </View>
  );
}