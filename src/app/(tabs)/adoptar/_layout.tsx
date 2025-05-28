import React from "react";
import { Stack } from "expo-router";

const AdoptarNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Adoptar' }} />
    </Stack>
  );
};

export default AdoptarNavigation;
