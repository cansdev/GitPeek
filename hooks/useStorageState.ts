import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { Platform } from 'react-native';

type UseStateHook<T> = [T | null, (value: T | null) => void];

function useAsyncState<T>(key: string, initialValue: T | null): UseStateHook<T> {
  const [state, setState] = React.useState<T | null>(initialValue);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let value: string | null = null;
        if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
          value = localStorage.getItem(key);
        } else {
          value = await SecureStore.getItemAsync(key);
        }
        setState(value ? JSON.parse(value) : initialValue); 
      } catch (error) {
        console.error(`Error fetching ${key} from storage:`, error);
      }
    };
    fetchData();
  }, [key, initialValue]);

  const setValue = React.useCallback(
    async (value: T | null) => {
      setState(value);
      try {
        const jsonValue = value !== null ? JSON.stringify(value) : null;        
        if (Platform.OS === 'web') {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(key, jsonValue || '');
          }
        } else {
          await SecureStore.setItemAsync(key, jsonValue || ''); 
        }
      } catch (error) {
        console.error(`Error storing ${key} to storage:`, error);
      }
    },
    [key]
  );

  return [state, setValue];
}

export function useStorageState<T>(key: string, initialValue: T | null): UseStateHook<T> {
  return useAsyncState<T>(key, initialValue);
}
