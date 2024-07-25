// AuthContext.tsx

import { createContext, PropsWithChildren, useContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
    signIn: (username: string, password: string) => Promise<void>;
    signOut: () => void;
    isLoading: boolean;
    userId?: string | null;
}

const AuthContext = createContext<AuthContextType>({
    signIn: async () => {},
    signOut: () => {},
    isLoading: false,
    userId: null,
});

export function useSession() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}

export function SessionProvider({ children }: PropsWithChildren<{}>) {
    const [userId, setUserId] = useState<string | null>(null); // Ensure userId state is managed correctly
    const [isLoading, setIsLoading] = useState(false);

    const signIn = async (username: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8080/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Authentication failed');
            }

            const responseData = await response.json();
            console.log('Sign in response:', responseData);

            const userId = String(responseData.data);
            if (!userId) {
                throw new Error('User ID not found in response');
            }

            console.log('User ID after login (before storing):', userId);

            // Store userId securely
            await SecureStore.setItemAsync('userId', userId);

            // Set context userId
            setUserId(userId);

        } catch (error) {
            console.error('Sign in error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = async () => {
        try {
            await SecureStore.deleteItemAsync('userId');
            setUserId(null); // Clear userId from context state
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ signIn, signOut, isLoading, userId }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
