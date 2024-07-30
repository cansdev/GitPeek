// LoginPage/index.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { useSession } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import styles from './styles';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, isLoading } = useSession();
    const router = useRouter();

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Validation Error', 'Please enter both username and password');
            return;
        }
        try {
            await signIn(username, password);
            router.push('/(tabs)/search'); 
        } catch (error) {
            Alert.alert('Login Error', 'Failed to login');
        }
    };

    const handleRegister = () => {
        router.push('/'); 
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
            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                    <Text style={styles.buttonText}>Log In</Text>
                )}
            </TouchableOpacity>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <TouchableOpacity onPress={handleRegister}>
                    <Text style={styles.link}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginPage;
