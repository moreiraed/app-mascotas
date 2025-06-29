import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/hooks/useAuth';
import SecondaryButton from '@/src/components/SecondaryButton'; 
import MainButtonLong from '@/src/components/MainButtonLong';
import fontStyles from '@/src/styles/fontStyles';
import styles from '@/src/styles/loginStyles';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const { requestPasswordReset } = useAuth();
  const router = useRouter();

  const handleResetRequest = async () => {
    if (!email) {
      Alert.alert('Error', 'Por favor ingresa tu correo');
      return;
    }

    const result = await requestPasswordReset(email);
    if (result.success) {
      Alert.alert('Exito', result.message);
      router.push('/(auth)/ResetPassword');
    } else {
      Alert.alert('Error', result.message || 'Error al solicitar recuperación');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={fontStyles.titulo}>Recuperar Contraseña</Text>
      <Text style={[fontStyles.text, { marginVertical: 20 }]}>
        Ingresa tu correo para restablecer tu contraseña.
      </Text>

      <View style={{ width: '100%', gap: 10 }}>
        <Text style={fontStyles.text}>Correo</Text>
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

      <MainButtonLong 
        title="Buscar email" 
        onPress={handleResetRequest}
      />

      <SecondaryButton
        title="Volver a Iniciar Sesion"
        onPress={() => router.back()}
      />
    </View>
  );
}