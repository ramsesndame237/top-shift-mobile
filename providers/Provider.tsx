import React, { FunctionComponent, PropsWithChildren } from 'react';
import SettingsProvider from './SettingsProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ToastProvider from './ToastProvider';
import AuthProvider from './AuthProvider';
import '../theme/unistyles';
import '../locale/i18n';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReactQueryProvider from './ReactQueryProvider';

const Provider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <ReactQueryProvider>
          <AuthProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <ToastProvider>
                {children}
              </ToastProvider>
            </GestureHandlerRootView>
          </AuthProvider>
        </ReactQueryProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  )
}

export default Provider;