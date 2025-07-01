// app/(tabs)/encontrar/_layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Mascotas Perdidas',
        }} 
      />
      <Stack.Screen name="create" />
      <Stack.Screen name="[id]" options={{title:'Detalles de publicación', headerTitleAlign:'center'}} />
    </Stack>
  );
}