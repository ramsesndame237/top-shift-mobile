import React from 'react';
import { Stack } from "expo-router";
import Provider from "../providers/Provider";
import { ThemeProvider } from '@react-navigation/native';
import useSettingStore from '../store/useSettingStore';
import { navigationTheme } from '@/theme';


export default function RootLayout() {
  const { mode  } = useSettingStore();

  return (
      <Provider>
        <ThemeProvider
            value={navigationTheme[mode]}
        >
          <Stack
              screenOptions={{
                headerShown: false,
              }}
          >
            <Stack.Screen
                name={'(auth)/login/index'}
            />
            <Stack.Screen
                name={'index'}
            />
            <Stack.Screen
                name={'(auth)/reset-password/index'}
                options={{}}
            />
            <Stack.Screen
                name={'(auth)/register/index'}
            />
            <Stack.Screen
                name={'(tabs)'}
            />
          </Stack>
        </ThemeProvider>
      </Provider>
  );
}