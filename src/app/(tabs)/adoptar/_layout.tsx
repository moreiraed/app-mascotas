import { Stack } from 'expo-router';
import { PetsProvider } from '@/src/contexts/PetsContext';

export default function Layout() {
  return (
    <PetsProvider>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Mascotas en Adopción',
          }} 
        />
        <Stack.Screen name="create" />
        <Stack.Screen name="[id]" options={{title:'Detalles de publicación', headerTitleAlign:'center'}} />
      </Stack>
    </PetsProvider>
  );
}