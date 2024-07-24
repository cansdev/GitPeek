import { createContext, PropsWithChildren, useContext } from 'react';
import { useStorageState } from '../hooks/useStorageState';

interface AuthContextType {
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  userId?: string | null;
}

const AuthContext = createContext<AuthContextType>({
  signIn: async () => {},
  signOut: () => {},
  session: null,
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
  const [userId, setUserId] = useStorageState<string | null>('userId', null); // Store and retrieve userId

  const signIn = async (username: string, password: string) => {
    try {
      // Make API call to authenticate using username and password
      const response = await fetch('http://localhost:8080/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign in');
      }

      const data = await response.json();
      console.log(data);
      const { userId } = data; // Assuming your API returns userId

      // Store the userId
      setUserId(userId);

    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = () => {
    setUserId(null); // Clear the stored userId
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session: null, // No session management in this example
        isLoading: false, // No loading state in this example
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
