import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import colors from '@/src/constants/colors';

export default function TabsLayout() {
  return (
    <Tabs
      /*  Opciones comunes a todas las pestañas  */
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,   // color cuando la pestaña está activa
        tabBarInactiveTintColor: '#8e8e93', // color cuando está inactiva
        tabBarStyle: {
          backgroundColor: '#ffffff',       // color de fondo de la barra
          borderTopColor: '#e5e5e5',        // línea superior suave
          height: 60,                  // altura de la barra
          paddingTop: 5,            // espacio superior para iconos
        },
      }}
    >
      
    {/* 1. Adoptar */}
      <Tabs.Screen
        name="adoptar"
        options={{
          title: 'Adoptar',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'paw' : 'paw-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* 2. Encontrar */}
      <Tabs.Screen
        name="encontrar"
        options={{
          title: 'Encontrar',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* 3. Mapa */}
      <Tabs.Screen
        name="mapa"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'map' : 'map-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      
      {/* 4. Foro */}
      <Tabs.Screen
        name="foro"
        options={{
          title: 'Foro',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* 5. Perfil */}
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
