import React, { FunctionComponent, PropsWithChildren, useCallback, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Platform, StyleSheet, View } from 'react-native';
import { fonts } from '../theme/typography';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';

SplashScreen.preventAutoHideAsync();

const SettingsProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {

  const [fontsLoaded] = useFonts(fonts);

  const onLayoutRootView = useCallback(async () => {
    if (!fontsLoaded) return;
    await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  useEffect(() => {
    const launchSettings = async () => {
      if (Platform.OS === 'android') {
        await NavigationBar.setVisibilityAsync('hidden');
      }
    }
    launchSettings();
  }, [])

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      onLayout={onLayoutRootView}
      style={style.layout}
    >
      <StatusBar
        animated
        style={'inverted'}
      />
      {children}
    </View>
  )
}

const style = StyleSheet.create({
  layout: {
    flex: 1
  }
})

export default SettingsProvider;