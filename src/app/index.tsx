import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import {
  useFonts,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';

import imagePath from '../constants/imagePath';
import loaderStyles from '@/src/styles/loaderStyles'
import fontStyles from '../styles/fontStyles';
import colors from '../constants/colors';

const Index = () => {
  // Se cargan las fuentes
  const [fontsLoaded] = useFonts({
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  // Setear manualmente si esta logeado o no
  const [isLogin, setIsLogin] = useState(false);
  
  const [minimumTimePassed, setMinimumTimePassed] = useState(false);

  // Tiempo de espera minimo para arrancar la aplicación
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumTimePassed(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Si las fuentes cargaron y el tiempo minimo ha pasado, redirigir
  useEffect(() => {
    if (fontsLoaded && minimumTimePassed) {
      if (isLogin) router.replace('/(tabs)/encontrar'); // Redirige a (tabs) si isLogin es true
      else router.replace('/(auth)'); // Redirige a (auth) si isLogin es false
    }
  }, [fontsLoaded, minimumTimePassed]);

  // Pantalla de espera
  return (
    <SafeAreaView style={loaderStyles.container}>
      <View style={loaderStyles.header}></View>
      <View style={loaderStyles.body}>
        <Image
          source={imagePath.icon}
          resizeMode="contain"
          style={loaderStyles.icon}
        />
        <Text style={fontStyles.titulo}>App Mascotas</Text>
      </View>
      <View style={loaderStyles.footer}>
        <ActivityIndicator size="large" color={colors.primary}/>
        <Text style={fontStyles.textLight}>Loading..</Text>
      </View>
    </SafeAreaView>
  );
};

export default Index;
