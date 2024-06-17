import React, { memo, useEffect, useState } from 'react'
import { Keyboard, View, ViewStyle } from 'react-native'
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Text } from './ui'
import px from '../utils/px'

type Props = {
  style?: ViewStyle;
}

const BuildVersion = memo((props: Props) => {
  const { styles } = useStyles(style);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setVisible(true));
    Keyboard.addListener('keyboardDidHide', () => setVisible(false));
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, [])

  if (visible) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        props.style
      ]}
    >
      <Text style={styles.text}>
        Version 1.0.0
      </Text>
    </View>
  )
})

const style = createStyleSheet(({ palette, typography }) => ({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: px(20)
  },
  text: {
    ...typography.body2_sb,
    color: palette.grey.gray2
  }
}))

export default BuildVersion