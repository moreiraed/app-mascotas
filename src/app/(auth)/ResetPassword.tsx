import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import MainButtonLong from '@/src/components/MainButtonLong';
import fontStyles from '@/src/styles/fontStyles';
import styles from '@/src/styles/loginStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResetPasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { resetPassword } = useAuth();
  const router = useRouter();

  const handlePasswordReset = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    // Obtener el email guardado en AsyncStorage
    const email = await AsyncStorage.getItem('resetPasswordEmail');
    if (!email) {
      Alert.alert('Error', 'Solicitud de recuperación no válida');
      return;
    }

    const result = await resetPassword(email, newPassword);
    if (result.success) {
      Alert.alert('Éxito', result.message);
      router.push('/(auth)/login');
    } else {
      Alert.alert('Error', result.message || 'Error al actualizar contraseña');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={fontStyles.titulo}>Nueva Contraseña</Text>
      <Text style={[fontStyles.text, { marginVertical: 20 }]}>
        Crea una nueva contraseña para tu cuenta.
      </Text>

      <View style={{ width: '100%', gap: 10 }}>
        <Text style={fontStyles.text}>Nueva Contraseña</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Nueva contraseña"
            placeholderTextColor="#888"
            style={[styles.input, fontStyles.textLight]}
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <Pressable
            style={styles.eyeButton}
            onPress={() => setShowNewPassword(prev => !prev)}
          >
            <Ionicons
              name={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#888"
            />
          </Pressable>
        </View>

        <Text style={fontStyles.text}>Confirmar Contraseña</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Confirmar nueva contraseña"
            placeholderTextColor="#888"
            style={[styles.input, fontStyles.textLight]}
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Pressable
            style={styles.eyeButton}
            onPress={() => setShowConfirmPassword(prev => !prev)}
          >
            <Ionicons
              name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#888"
            />
          </Pressable>
        </View>
      </View>

      <MainButtonLong 
        title="Actualizar Contraseña" 
        onPress={handlePasswordReset}
      />
    </View>
  );
}