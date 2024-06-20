import { addEventListener } from '@react-native-community/netinfo';
import React, { Fragment, FunctionComponent, PropsWithChildren, useEffect } from 'react'
import useNotificationsStore from '../store/useToastStore';
import Toast from '../components/ui/Toast';


const ToastProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { toast } = useNotificationsStore();

  useEffect(() => {
    const unsubscribe = addEventListener((state) => {
      toast({
        message: state.isConnected ? 'Connection update!' : 'No internet connection!',
        variant: state.isConnected ? 'info' : 'error'
      })
    });
    return () => unsubscribe();
  }, [])

  return (
    <Fragment>
      {children}
      <Toast />
    </Fragment>
  )
}

export default ToastProvider