import React from "react";
import { Stack } from "expo-router";

const PerfilNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PerfilNavigation;