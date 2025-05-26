import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/loginStyles'
import MainButtonLong from '@/src/components/MainButtonLong';
import MainFacebokButton from '@/src/components/MainFacebokButton';
import MainGoogleButton from '@/src/components/MainGoogleButton';

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

      <MainFacebokButton title='Continua con Facebook'></MainFacebokButton>
      <MainGoogleButton title='Continua con Google'></MainGoogleButton>

      <View style={styles.lineContainer}>
        <View style={styles.line}></View>
        <Text style={styles.orText}>O</Text>
        <View style={styles.line}></View>
      </View>

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

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿Ya tienes cuenta?</Text>
        <TouchableOpacity>
          <Text style={styles.footerLink} onPress={registrarse}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}