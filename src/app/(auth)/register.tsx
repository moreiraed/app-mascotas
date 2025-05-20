import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/registerStyles'
import MainButtonLong from '@/src/components/MainButtonLong';
import SecondaryButtonLong from '@/src/components/SecondaryButton';

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const registrarse = () => {
    router.push('/(auth)/welcome');
  }
  const login = () => {
    router.push('/(auth)/login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <Text style={styles.subtitle}>Crea tu cuenta para comenzar</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        placeholder="Nombre de Usuario"
        placeholderTextColor="#888"
        style={styles.input}
      />

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
          placeholder="Crea una contraseña"
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

      <MainButtonLong title='Registrarse' onPress={registrarse}></MainButtonLong>

      <Text style={styles.loginPrompt}>¿Ya tienes cuenta?</Text>

      <SecondaryButtonLong title='Ingresar' onPress={login}></SecondaryButtonLong>
    </View>
  );
}