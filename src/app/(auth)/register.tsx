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
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import styles from '../../styles/registerStyles'
import MainButtonLong from '@/src/components/MainButtonLong';
import SecondaryButtonLong from '@/src/components/SecondaryButton';
import MainFacebokButton from '@/src/components/MainFacebokButton';
import MainGoogleButton from '@/src/components/MainGoogleButton';


export default function RegisterScreen() {
  const [checkboxChecked, setCheckboxChecked] = useState(false);  // Declaramos el estado para el checkbox

  const toggleCheckbox = () => {
    setCheckboxChecked(prevState => !prevState);  // Cambia el estado cuando se presiona el botón
  };

  const showTerms = () => {
    // Aquí puedes hacer lo que necesites al hacer click en el texto de "Ver términos y condiciones"
    console.log("Mostrar términos y condiciones");
  };

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
      <Text style={styles.title}>Comencemos</Text>

      <MainFacebokButton title='Continua con Facebook'></MainFacebokButton>
      <MainGoogleButton title='Continua con Google'></MainGoogleButton>

      <View style={styles.lineContainer}>
        <View style={styles.line}></View>
        <Text style={styles.orText}>O</Text>
        <View style={styles.line}></View>
      </View>

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


      <View style={styles.footerContainer}>
        <View style={styles.checkboxRow}>
          <Text style={styles.footerTextTC}>He leído y acepto los <Text style={styles.footerLink} onPress={showTerms}>términos y condiciones</Text></Text>
          <TouchableOpacity style={styles.checkboxButton} onPress={toggleCheckbox}>
            {/* Aquí mostramos el ícono con el color naranja #FF9F00 */}
            <FontAwesome name={checkboxChecked ? 'check-square' : 'square'} size={24} color={checkboxChecked ? '#FF9F00' : '#ddd'} />
          </TouchableOpacity>
        </View>
      </View>

      <MainButtonLong title='Registrarse' onPress={registrarse}></MainButtonLong>

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿Ya tienes cuenta?</Text>
        <TouchableOpacity>
          <Text style={styles.footerLink} onPress={login}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}