import React from "react";
import { Stack } from "expo-router";

const EncontrarNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Mascotas perdidas" }} />
    </Stack>
  );
};

export default EncontrarNavigation;
