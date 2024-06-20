import React, { memo } from 'react'
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Platform, StyleProp, TouchableNativeFeedback, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import px from '../../utils/px';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

type Props = ViewProps & SvgProps & {
  Icon: React.FC<SvgProps>;
  styleBox?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  rippleColor?: string;
  active?: boolean;
  onPress?: () => void;
}

const IconButton = memo((props: Props) => {
  const { Icon, active, onPress, style: styleContainer, backgroundColor, rippleColor, ...rest } = props;
  const { styles, theme: { palette } } = useStyles(style);

  const uas = useAnimatedStyle(() => ({
    backgroundColor: withTiming(active ? palette.gray : backgroundColor ?? palette.background, { duration: 400 })
  }), [backgroundColor]);

  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity
        activeOpacity={.8}
        onPress={onPress}
      >
        <Animated.View
          style={[
            styles.container,
            ...[props.style ?? {}],
            uas
          ]}
        >
          <Icon
            fill={active ? palette.white : palette.primary}
            {...rest}
          />
        </Animated.View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={[styles.androidContainer, ...[props.style]]}>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(rippleColor ?? palette.gray, false)}
      >
        <Animated.View
          style={[
            styles.box,
            ...[props.styleBox],
            uas,
          ]}
        >
          <Icon
            fill={active ? palette.white : palette.primary}
            {...rest}
          />
        </Animated.View>
      </TouchableNativeFeedback>
    </View>
  )
});

const style = createStyleSheet(() => ({
  container: {
    flex: 1,
    borderRadius: px(30),
    padding: px(10),
    alignItems: 'center',
    justifyContent: 'center'
  },
  androidContainer: {
    overflow: 'hidden',
    borderRadius: px(30),
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    padding: px(10),
    alignItems: 'center',
    justifyContent: 'center'
  }
}))

export default IconButton