import React, { memo, useEffect, useState } from 'react'
import { StyleProp, TextStyle, View, ViewProps } from 'react-native'
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Text } from '../ui';
import Animated, { FadeIn, FadeOut, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import px from '../../utils/px';
import CheckIcon from '../../assets/icons/check_icon.svg';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type Props = ViewProps & {
  error?: boolean;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  checked?: boolean;
  onChecked?: (checked: boolean) => void;
}

const IconCheckAnimate = Animated.createAnimatedComponent(View);

const Checkbox = memo<Props>((props) => {
  const { styles, theme: { palette } } = useStyles(style);
  const active = useSharedValue(false);
  const [checked, setChecked] = useState(props.checked ?? false);

  const onChecked = (value: boolean) => {
    setChecked(value);
    props.onChecked?.(value);
  }

  const gesture = Gesture
    .Tap()
    .onBegin(() => (active.value = true))
    .onFinalize(() => {
      active.value = false;
      if (onChecked) runOnJS(onChecked)(!checked)
    });

  const uas = useAnimatedStyle(() => ({
    transform: [
      { scale: withTiming(active.value ? 1.2 : 1) }
    ],
    borderColor: withTiming(props.error ? palette.error : checked ? 'transparent' : palette.divider),
    backgroundColor: withTiming(checked ? palette.primary : 'transparent')
  }));

  useEffect(() => {
    setChecked(props.checked ?? false);
  }, [props.checked]);


  return (
    <GestureDetector gesture={gesture}>
      <View
        style={[
          styles.container,
          props.style
        ]}
      >
        <Animated.View
          style={[styles.box, uas]}
        >
          {checked ?
            <IconCheckAnimate
              entering={FadeIn}
              exiting={FadeOut}
            >
              <CheckIcon fill={palette.white} />
            </IconCheckAnimate> :
            null
          }
        </Animated.View>
        <Text style={[styles.text, props.labelStyle ?? {}]}>{props.label}</Text>
      </View>
    </GestureDetector>
  )
});

const style = createStyleSheet(({ palette, typography }) => ({
  container: {
    flexDirection: 'row',
    columnGap: px(10)
  },
  box: {
    overflow: 'hidden',
    width: px(20),
    height: px(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: px(5),
    borderWidth: 1,
    backgroundColor: palette.primary
  },
  text: {
    ...typography.body2_m,
    color: palette.grey.gray1
  }
}));

export default Checkbox