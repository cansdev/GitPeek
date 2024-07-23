// auth/index.tsx

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSession } from '@/context/AuthContext'; 
import { useRouter } from 'expo-router';
import RegisterPage from '@/components/RegisterPage';

const Register = () => {
  const { signIn } = useSession();
  const router = useRouter();

  const handleRegister = () => {
    signIn(); 
    router.push('/auth/sign-in'); 
  };

  return (
    <View style={styles.container}>
      <RegisterPage />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Register;
