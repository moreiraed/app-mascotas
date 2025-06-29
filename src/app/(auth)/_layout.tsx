import { Stack } from 'expo-router';

export default function LayoutAuth() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: 'Iniciar Sesión', headerTitleAlign: 'center' }} />
      <Stack.Screen name="register" options={{ title: 'Registrarse', headerTitleAlign: 'center' }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="permisos" options={{ title: 'Permisos' }} />
      <Stack.Screen name="terms" options={{ title: 'Términos y Condiciones', headerTitleAlign: 'center' }} />
      <Stack.Screen 
        name="ForgotPassword" 
        options={{ 
          title: 'Recuperar Contraseña', 
          headerTitleAlign: 'center' 
        }} 
      />
      <Stack.Screen 
        name="ResetPassword" 
        options={{ 
          title: 'Nueva Contraseña', 
          headerTitleAlign: 'center' 
        }} 
      />
    </Stack>
  );
}