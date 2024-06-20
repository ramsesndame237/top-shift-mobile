import React, { FunctionComponent, PropsWithChildren, memo } from 'react'
import useAuthStore from '../store/useAuthStore'
import { useRouter } from 'expo-router';

const AuthProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    const auth  = false;
    if (auth) {
      setAuth({});
      router.replace('/(tabs)/')
    }
  }, []);

  return (
    children
  )
}

export default memo(AuthProvider)