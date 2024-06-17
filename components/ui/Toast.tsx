import React, { FC, memo, useEffect } from 'react'
import Animated, { Easing, SlideInDown, SlideOutDown } from 'react-native-reanimated'
import Text from './Text'
import { createStyleSheet, useStyles } from "react-native-unistyles";
import useNotificationsStore from '../../store/useToastStore'
import px, { width } from '../../utils/px'


const COLORS = {
  success: 'primary',
  error: 'error',
  info: 'info',
  text: 'text'
} as const;

const Toast: FC = () => {
  const { state, cancel } = useNotificationsStore();
  const { styles, theme: { palette } } = useStyles(style);
  const color = state?.variant ?? 'text';

  useEffect(() => {
    const subscribe = setTimeout(() => cancel(), 5000);
    return () => clearTimeout(subscribe);
  }, [state])

  return (
    state ?
      <Animated.View
        entering={
          SlideInDown
            .springify()
            .damping(50)
        }
        exiting={
          SlideOutDown
            .duration(1000)
            .easing(Easing.ease)
        }
        style={styles.container}
      >
        <Text
          style={[
            styles.text,
            { color: palette[COLORS[color]] }
          ]}
        >
          {state.message}
        </Text>
      </Animated.View> :
      null
  )
}

const style = createStyleSheet(({ palette, typography }) => ({
  container: {
    zIndex: 10000,
    width,
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: px(40),
    backgroundColor: palette.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingHorizontal: px(16),
    paddingVertical: px(5),
    borderRadius: px(8),
  },
  text: {
    ...typography.body2,
    flex: 1,
    textAlign: 'center',
  }
}))


export default memo(Toast)