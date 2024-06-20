import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export default function useKeyboard() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return { visible };
}