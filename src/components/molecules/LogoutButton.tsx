import React from 'react';
import { Alert } from 'react-native';
import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'expo-router';
import MainButtonLong from '@/src/components/MainButtonLong';

const LogoutButton = () => {
  const { signOut, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas salir de tu cuenta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          onPress: async () => {
            await signOut();
            router.replace('/(auth)/login'); // Redirige al login después de cerrar sesión
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <MainButtonLong 
      title="Cerrar sesión" 
      onPress={handleLogout}
      loading={isLoading}
    />
  );
};

export default LogoutButton;