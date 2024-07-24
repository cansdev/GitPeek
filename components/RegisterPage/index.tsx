import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useSession } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import styles from './styles';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useSession();
    const router = useRouter();

    const handleRegister = async () => {
        if (!username || !password) {
            Alert.alert('Validation Error', 'Please enter both username and password');
            return;
        }

        try {
            await register(username, password);
            router.push('/auth/sign-in'); 
        } catch (error) {
            Alert.alert('Registration Error', 'Failed to register');
        }
    };

    const register = async (username: String, password: String) => {
        try {
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to register');
            }

            const data = await response.json();
            console.log(data);
            return data; 
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('@/assets/images/GitPeekIcon.png')} style={styles.logo} />
                <Text style={styles.title}>Create Your Account</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => router.push('/auth/sign-in')}>
                    <Text style={styles.link}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RegisterPage;
