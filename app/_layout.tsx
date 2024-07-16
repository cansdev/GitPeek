import React from 'react';
import { Stack } from 'expo-router/stack';
import { BookmarkProvider } from '@/context/BookmarkContext';

export default function Layout() {
  return (
    <BookmarkProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    </BookmarkProvider>
  );
}
