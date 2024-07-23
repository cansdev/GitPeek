// components/LoginPage.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useSession } from '@/context/AuthContext'; 
import { useRouter } from 'expo-router';
import styles from './styles';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useSession();
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Validation Error', 'Please enter both username and password');
      return;
    }

    try {
      await signIn(); 
      router.push('/(tabs)/search'); 
    } catch (error) {
      Alert.alert('Login Error', 'Failed to login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/GitPeekIcon.png')} style={styles.logo} />
        <Text style={styles.title}>Welcome Back</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default LoginPage;
