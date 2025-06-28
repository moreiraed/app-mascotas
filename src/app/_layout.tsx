import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../utils/contexts/AuthContext";

const RootNavigation = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={{headerShown: false}} />
    </AuthProvider>
  );
};

export default RootNavigation;