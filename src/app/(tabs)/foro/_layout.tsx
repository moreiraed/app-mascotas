import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { ProveedorForo } from '@/src/contexts/ForoContext';

const ForoNavigation = () => {
  return (
    <ProveedorForo>
      <StatusBar style="dark" /> 

      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Foro',  
            headerLargeTitle: true,
            headerSearchBarOptions: {
              placeholder: 'Buscar hilos...',
            },
          }} 
        />
        <Stack.Screen 
          name="crear-hilo" 
          options={{ 
            title: 'Crear Nuevo Tema',  
            presentation: 'modal',
          }} 
        />
        <Stack.Screen 
          name="hilo/[id]" 
          options={{ 
            title: 'Detalles del Tema',  
          }} 
        />
      </Stack>
    </ProveedorForo>
  );
};

export default ForoNavigation;