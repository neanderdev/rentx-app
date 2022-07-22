import "react-native-gesture-handler";

import React, { useCallback, useEffect, useState } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LogBox, View } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  Inter_400Regular,
  Inter_500Medium,
} from '@expo-google-fonts/inter';
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';
import { ThemeProvider } from 'styled-components';

import { AppProvider } from "./src/hooks";

import { Routes } from "./src/routes";

import theme from './src/styles/theme';

LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
  'Found screens with the same name nested inside one another. Check:'
])

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          Inter_400Regular,
          Inter_500Medium,
          Archivo_400Regular,
          Archivo_500Medium,
          Archivo_600SemiBold
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <View
          onLayout={onLayoutRootView}
          style={{
            flex: 1
          }}
        >
          <AppProvider>
            <Routes />
          </AppProvider>
        </View>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
