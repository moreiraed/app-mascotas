import { Stack } from 'expo-router';

export default function LayoutAuth() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: 'Iniciar Sesión' }} />
      <Stack.Screen name="register" options={{ title: 'Registrarse' }} />
      <Stack.Screen name="welcome" options={{ title: 'Bienvenido' }} />
      <Stack.Screen name="permisos" options={{ title: 'Permisos' }} />
    </Stack>
  );
}
