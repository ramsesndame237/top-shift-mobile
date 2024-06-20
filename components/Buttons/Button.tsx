import React, { PropsWithChildren, memo, useMemo } from 'react';
import { ActivityIndicator, Platform, StyleProp, TextStyle, TouchableNativeFeedback, TouchableOpacity, View, ViewStyle } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Text } from "../ui";
import px from '../../utils/px';
import Animated, { LinearTransition, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface Props extends PropsWithChildren {
  loading?: boolean;
  disabled?: boolean;
  textStyle?: TextStyle;
  outlined?: boolean;
  style?: StyleProp<ViewStyle>;
  layoutAnimation?: boolean;
  onPress?: () => void;
}

const Button = memo<Props>(({ ...props }) => {
  const { onPress, children, textStyle, loading, outlined, layoutAnimation } = props;
  const { styles, theme: { palette } } = useStyles(style);
  const active = useSharedValue(false);

  const gesture = useMemo(() =>
    Gesture
      .Pan()
      .onBegin(() => (active.value = true))
      .onFinalize(() => (active.value = false)),
    []);

  const uas = useAnimatedStyle(() => ({
    transform: [
      { scaleY: withTiming(!loading ? active.value ? .9 : 1 : 1) }
    ]
  }), [loading]);

  if (Platform.OS === 'ios') {
    return (
      <GestureDetector gesture={gesture}>
        <TouchableOpacity
          disabled={props.disabled}
          activeOpacity={.8}
          onPress={onPress}
        >
          <Animated.View
            layout={layoutAnimation ? LinearTransition.damping(10) : undefined}
            style={[
              styles.containerIos,
              loading ? { backgroundColor: palette.grey.gray2 } : {},
              props.style ?? {},
              outlined ? styles.outlined : {},
              uas
            ]}
          >
            {loading ?
              <ActivityIndicator
                animating
                color={palette.primary}
              /> :
              <Text
                style={[
                  styles.text,
                  textStyle,
                  outlined ? { color: palette.text } : {}
                ]}
              >
                {children}
              </Text>
            }
          </Animated.View>
        </TouchableOpacity>
      </GestureDetector>
    )
  }

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        layout={layoutAnimation ? LinearTransition : undefined}
        style={[
          styles.container,
          loading ? { backgroundColor: palette.grey.gray2 } : {},
          props.style ?? {},
          outlined ? styles.outlined : {},
          uas
        ]}
      >
        <TouchableNativeFeedback
          disabled={props.disabled}
          onPress={onPress}
        >
          <View style={[styles.btn]}>
            {loading ?
              <ActivityIndicator
                animating
                color={palette.primary}
              /> :
              <Text
                style={[
                  styles.text,
                  textStyle,
                  outlined ? { color: palette.text } : {}
                ]}
              >
                {children}
              </Text>
            }
          </View>
        </TouchableNativeFeedback>
      </Animated.View>
    </GestureDetector>
  );
})

export default Button;


const style = createStyleSheet(({ palette, typography }) => ({
  container: {
    overflow: 'hidden',
    borderRadius: px(5),
    backgroundColor: palette.primary,
    elevation: 3,
    height: px(52)
  },
  containerIos: {
    overflow: 'hidden',
    borderRadius: px(5),
    backgroundColor: palette.primary,
    shadowRadius: 2.22,
    shadowOpacity: .22,
    height: px(52),
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  outlined: {
    borderWidth: 1,
    borderColor: palette.text,
    backgroundColor: palette.background
  },
  btn: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    ...typography.title3_sb,
    color: palette.white,
  }
}))