import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import {
  useFonts,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import { useAuth } from '@/src/hooks/useAuth'; // Importa el hook de autenticación
import imagePath from '../constants/imagePath';
import loaderStyles from '@/src/styles/loaderStyles';
import fontStyles from '../styles/fontStyles';
import colors from '../constants/colors';


const Index = () => {
  // Carga de fuentes
  const [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  const [minimumTimePassed, setMinimumTimePassed] = useState(false);
  const { user, isLoading } = useAuth(); // Obtiene el estado de autenticación

  // Tiempo mínimo de espera para el splash screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumTimePassed(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Redirección basada en autenticación
  useEffect(() => {
    if (fontsLoaded && minimumTimePassed && !isLoading) {
      if (user) {
        router.replace('/(tabs)/adoptar'); // Usuario autenticado
      } else {
        router.replace('/(auth)'); // No autenticado
      }
    }
  }, [fontsLoaded, minimumTimePassed, isLoading, user]);

  // Muestra el splash screen mientras carga
  if (!fontsLoaded || !minimumTimePassed || isLoading) {
    return (
      <SafeAreaView style={loaderStyles.container}>
        <View style={loaderStyles.header}></View>
        <View style={loaderStyles.body}>
          <Image
            source={imagePath.icon}
            resizeMode="contain"
            style={loaderStyles.icon}
          />
          <Text style={fontStyles.titulo}>MascotApp</Text>
        </View>
        <View style={loaderStyles.footer}>
          <ActivityIndicator size="large" color={colors.primary}/>
          <Text style={fontStyles.textLight}>Loading..</Text>
        </View>
      </SafeAreaView>
    );
  }

  return null; // Nunca debería llegar aquí
};

export default Index;