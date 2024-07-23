import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import styles from './styles';

SplashScreen.preventAutoHideAsync();

const Splash: React.FC = () => {
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
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Image
        source={require('@/assets/images/GitPeekIcon.png')} 
        style={styles.logo}
      />
    </View>
  );
};

export default Splash;
