import {useState, useEffect, useCallback} from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '@/components/SearchBar/index'
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Tab() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);


  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View 
    style={styles.container}
    onLayout={onLayoutRootView}>
      <SearchBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },

  userCardsLayout: {
    paddingVertical: 80,
    marginLeft: 20,
    width: '100%',
  },

  
  
});
