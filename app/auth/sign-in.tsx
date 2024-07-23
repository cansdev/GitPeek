// auth/sign-in.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginPage from '@/components/LoginPage'; 

const SignIn = () => {
  return (
    <View style={styles.container}>
      <LoginPage />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default SignIn;
