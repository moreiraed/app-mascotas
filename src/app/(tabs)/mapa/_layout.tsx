import React from "react";
import { Stack } from "expo-router";

const MapaNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default MapaNavigation;