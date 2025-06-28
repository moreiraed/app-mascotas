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
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import styles from '../../styles/loginStyles';
import MainButtonLong from '@/src/components/MainButtonLong';
import MainFacebokButton from '@/src/components/MainFacebokButton';
import MainGoogleButton from '@/src/components/MainGoogleButton';
import fontStyles from '@/src/styles/fontStyles';
import { useAuth } from '@/src/hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen() {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { register, isLoading: authLoading } = useAuth();

  const toggleCheckbox = () => {
    setCheckboxChecked(prevState => !prevState);
  };

  // Muestra los términos y condiciones (implemetar logica)
  const showTerms = () => {
    console.log("Mostrar términos y condiciones");
  };

  // Funcion que alerta indicando que la funcionalidad está en desarrollo
  const handleSocialLogin = (provider: string) => {
    Alert.alert('Próximamente', `Login con ${provider} en desarrollo`);
  };

  // Maneja el registro de usuario
  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (!checkboxChecked) {
      Alert.alert('Error', 'Debes aceptar los términos y condiciones');
      return;
    }

    setIsLoading(true);
    const result = await register({
      username,
      email,
      password
    });
    setIsLoading(false);

    if (result.success) {
      // Guardar el username del usuario para mostrarlo en el perfil
      try {
        const storedUser = await AsyncStorage.getItem('currentUser');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          await AsyncStorage.setItem(`username_${user.id}`, username);
        }
      } catch (error) {
        console.error('Error saving username:', error);
      }
      
      router.push('/(auth)/welcome');
    } else {
      Alert.alert('Error', result.message || 'Error al registrar');
    }
  };

  const login = () => {
    router.push('/(auth)/login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <Text style={fontStyles.titulo}>¡Comencemos!</Text>
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
          <Text style={[fontStyles.text, {paddingLeft: 5}]}>Nombre</Text>
          <TextInput
            placeholder="Nombre de Usuario"
            placeholderTextColor="#888"
            style={[styles.input, fontStyles.textLight]}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View style={{gap: 5}}>
          <Text style={[fontStyles.text, {paddingLeft: 5}]}>Correo</Text>
          <TextInput
            placeholder="tucorreo@ejemplo.com"
            placeholderTextColor="#888"
            style={[styles.input, fontStyles.textLight]}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={{gap: 5}}>
          <Text style={[fontStyles.text, {paddingLeft: 5}]}>Contraseña</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Crea una contraseña"
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

        <View style={styles.footerContainer}>
          <View style={styles.checkboxRow}>
            <Text style={styles.footerTextTC}>He leído y acepto los <Text style={styles.footerLink} onPress={showTerms}>términos y condiciones</Text></Text>
            <TouchableOpacity style={styles.checkboxButton} onPress={toggleCheckbox}>
              <FontAwesome name={checkboxChecked ? 'check-square' : 'square'} size={24} color={checkboxChecked ? '#FF9F00' : '#ddd'} />
            </TouchableOpacity>
          </View>
        </View>

        <MainButtonLong 
          title='Registrarse' 
          onPress={handleRegister}
          loading={isLoading || authLoading}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿Ya tienes cuenta?</Text>
        <TouchableOpacity>
          <Text style={styles.footerLink} onPress={login}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}