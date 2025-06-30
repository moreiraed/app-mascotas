import React from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'expo-router';
import MainButtonLong from '@/src/components/MainButtonLong';
import colors from '@/src/constants/colors';

type LogoutButtonProps = {
  style?: any;
};

const LogoutButton = ({ style }: LogoutButtonProps) => {
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
      style={[logoutButtonStyles.button, style]}
      textStyle={logoutButtonStyles.text}
    />
  );
};

const logoutButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: '#FFF',
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'stretch',
    paddingVertical: 14,
    marginVertical: 0,
  },
  text: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LogoutButton;