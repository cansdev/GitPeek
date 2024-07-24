import { useContext, createContext, PropsWithChildren } from 'react';
import { useStorageState } from '../hooks/useStorageState';

const AuthContext = createContext<{
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => {},
  signOut: () => {},
  session: null,
  isLoading: false,
});

export function useSession() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

export function SessionProvider({ children }: PropsWithChildren<{}>) {
  const [[isLoading, session], setSession] = useStorageState('session');

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
      const token = data.token;

      // Store the session token or identifier
      setSession(token);

    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signOut = () => {
    setSession(null); // Clear the stored session token or identifier
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
