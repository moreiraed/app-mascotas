import React from "react";
import { Stack } from "expo-router";

const PerfilNavigation = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default PerfilNavigation;