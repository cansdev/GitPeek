// app/auth/_layout.tsx

import React from 'react';
import { Stack } from 'expo-router/stack';

const AuthLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
