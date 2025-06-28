import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/loginStyles';
import MainButtonLong from '@/src/components/MainButtonLong';
import MainFacebokButton from '@/src/components/MainFacebokButton';
import MainGoogleButton from '@/src/components/MainGoogleButton';
import fontStyles from '@/src/styles/fontStyles';
import { useAuth } from '@/src/hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn, isLoading: authLoading } = useAuth();

  // Funcion que alerta indicando que la funcionalidad está en desarrollo
  const handleSocialLogin = (provider: string) => {
    Alert.alert('Próximamente', `Login con ${provider} en desarrollo`);
  };

  // Maneja el inicio de sesión con email o nombre de usuario y contraseña
  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    const result = await signIn(identifier, password);
    setIsLoading(false);

    if (result.success) {
      // Guardar el username del usuario para mostrarlo en el perfil
      try {
        const storedUser = await AsyncStorage.getItem('currentUser');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          // Si el usuario inició sesión con email, buscar su username
          if (user.email === identifier) {
            await AsyncStorage.setItem(`username_${user.id}`, user.username);
          } else {
            await AsyncStorage.setItem(`username_${user.id}`, identifier);
          }
        }
      } catch (error) {
        console.error('Error saving username:', error);
      }
      
      router.push('/(auth)/welcome');
    } else {
      Alert.alert('Error', result.message || 'Error al iniciar sesión');
    }
  };

  const registrarse = () => {
    router.push('/(auth)/register');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <Text style={fontStyles.titulo}>¡Haz vuelto!</Text>
      </View>

      <View style={{width: '100%', gap: 10, paddingVertical: 10}}>
        <MainFacebokButton
          title='Continua con Facebook'
          onPress={() => handleSocialLogin('Facebook')}  
        />
        <MainGoogleButton
          title='Continua con Google'
          onPress={() => handleSocialLogin('Google')}
        />
      </View>

      <View style={styles.lineContainer}>
        <View style={styles.line}></View>
        <Text style={styles.orText}>O</Text>
        <View style={styles.line}></View>
      </View>

      <View style={{width: '100%', gap: 10}}>
        <View style={{gap: 5}}>
          <Text style={[fontStyles.text, {paddingLeft: 5}]}>Correo o Usuario</Text>
          <TextInput
            placeholder="tucorreo@ejemplo.com o usuario"
            placeholderTextColor="#888"
            style={[styles.input, fontStyles.textLight]}
            keyboardType="email-address"
            autoCapitalize="none"
            value={identifier}
            onChangeText={setIdentifier}
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
              value={password}
              onChangeText={setPassword}
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
        
        <MainButtonLong 
          title='Ingresar' 
          onPress={handleLogin}
          loading={isLoading || authLoading}
        />
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