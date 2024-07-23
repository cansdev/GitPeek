// app/_layout.tsx

import React from 'react';
import { Stack } from 'expo-router/stack';
import { BookmarkProvider } from '@/context/BookmarkContext';
import { SessionProvider } from '../context/AuthContext';

const RootLayout: React.FC = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function Layout() {
  return (
    <BookmarkProvider>
      <SessionProvider>
        <RootLayout />
      </SessionProvider>
    </BookmarkProvider>
  );
}
