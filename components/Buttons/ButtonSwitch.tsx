import React, { forwardRef, memo, useState } from 'react'
import { TouchableWithoutFeedback, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { createStyleSheet, useStyles } from "react-native-unistyles";
import px from '../../utils/px'

type ButtonSwitchProps = {
  size?: 'small' | 'medium';
  style?: ViewStyle;
  checked?: boolean;
  onChecked?: (checked?: boolean) => void;
}

const ButtonSwitch = forwardRef<TouchableWithoutFeedback, ButtonSwitchProps>((props, ref) => {
  const { styles, theme: { palette } } = useStyles(style);
  const small = props.size === 'small';
  const [checked, setChecked] = useState(props.checked);

  const onChecked = () => {
    setChecked(c => !c);
    props.onChecked?.(!checked);
  }

  const uas = useAnimatedStyle(() => ({
    backgroundColor: withTiming(checked ? palette.white : palette.grey.gray1),
    transform: [
      { translateX: withTiming(checked ? small ? 26 : 28 : 0) },
    ],
  }))

  const uasContainer = useAnimatedStyle(() => ({
    backgroundColor: withTiming(checked ? palette.primary : palette.gray)
  }))

  return (
    <TouchableWithoutFeedback
      ref={ref}
      onPress={onChecked}
    >
      <Animated.View
        style={[styles.container(small), props.style, uasContainer]}
      >
        <Animated.View
          style={[styles.box(small), uas]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  )
})

const style = createStyleSheet(({ palette }) => ({
  container: (small: boolean) => ({
    borderRadius: px(48),
    height: px(small ? 30 : 42),
    width: px(small ? 56 : 70),
    padding: px(2),
    justifyContent: 'center'
  }),
  box: (small: boolean) => ({
    alignItems: 'center',
    justifyContent: 'center',
    height: px(small ? 26 : 38),
    width: px(small ? 26 : 38),
    borderRadius: px(48),
  }),
}))

export default memo(ButtonSwitch)