import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/loginStyles'
import MainButtonLong from '@/src/components/MainButtonLong';
import MainFacebokButton from '@/src/components/MainFacebokButton';
import MainGoogleButton from '@/src/components/MainGoogleButton';
import fontStyles from '@/src/styles/fontStyles';

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
    <ScrollView style={styles.container}>

      <View style={styles.title}>
        <Text style={fontStyles.titulo}>¡Haz vuelto!</Text>
      </View>

      <View style={{width: '100%', gap: 10, paddingVertical: 10}}>
        <MainFacebokButton title='Continua con Facebook'></MainFacebokButton>
        <MainGoogleButton title='Continua con Google'></MainGoogleButton>
      </View>

      <View style={styles.lineContainer}>
        <View style={styles.line}></View>
        <Text style={styles.orText}>O</Text>
        <View style={styles.line}></View>
      </View>

      <View style={{width: '100%', gap: 10}}>

        <View style={{gap: 5}}>
          <Text style={[fontStyles.text, {paddingLeft: 5}]}>Correo</Text>
          <TextInput
            placeholder="tucorreo@ejemplo.com"
            placeholderTextColor="#888"
            style={[styles.input, fontStyles.textLight]}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={{gap: 5}}>
          <Text style={[fontStyles.text, {paddingLeft: 5}]}>Contraseña</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Introduce tu contraseña"
              placeholderTextColor="#888"
              style={[styles.input, fontStyles.textLight]}
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
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotText}>¿Olvidó su contraseña?</Text>
        </TouchableOpacity>
        
        <MainButtonLong title='Ingresar' onPress={ingresar}></MainButtonLong>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿No tienes cuenta?</Text>
        <TouchableOpacity>
          <Text style={styles.footerLink} onPress={registrarse}>Registrate</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
  );
}