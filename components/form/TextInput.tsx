import React, { FC, forwardRef, memo } from "react";
import { TextInput as RNTextInput, View, TextInputProps, ViewStyle, TextStyle } from "react-native";
import { SvgProps } from "react-native-svg";
import { Text } from "../ui";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import px from "../../utils/px";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";


interface Props extends TextInputProps {
  label?: string,
  startIcon?: FC<SvgProps>;
  endIcon?: FC<SvgProps>;
  error?: boolean;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const TextInput = forwardRef<RNTextInput, Props>((props, ref) => {
  const { style: styleInput, startIcon: StartIcon, endIcon: EndIcon, error, ...rest } = props;
  const { styles, theme: { palette } } = useStyles(style);

  const active = useSharedValue(false);
  const uas = useAnimatedStyle(() => ({
    borderColor: withTiming(error ? palette.error : active.value ? palette.primary : palette.divider)
  }))

  return (
    <View style={[styles.container]}>
      {props.label ?
        <Text style={[styles.label, props.labelStyle]}>
          {props.label}
        </Text> :
        null
      }
      <Animated.View
        style={[styles.row, props.containerStyle, uas]}
      >
        {StartIcon ?
          <StartIcon
            stroke={error ? palette.error : undefined}
            width={px(20)}
            height={px(20)}
            style={{ marginLeft: px(20) }}
          /> :
          null
        }
        <RNTextInput
          ref={ref}
          onFocus={() => (active.value = true)}
          onBlur={() => (active.value = false)}
          selectionColor={palette.primary}
          style={[styles.inputText, styleInput]}
          {...rest}
        />
        {EndIcon ?
          <EndIcon
            color={error ? palette.error : undefined}
            width={px(20)}
            height={px(20)}
            style={{ marginRight: px(20) }}
          /> :
          null
        }
      </Animated.View>
    </View>
  )
});

export default memo(TextInput);

const style = createStyleSheet(({ palette, typography }) => ({
  container: {
    width: '100%',
  },
  row: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.white,
    borderRadius: px(5),
    borderBottomWidth: px(1),
    borderBottomColor: palette.divider,
  },
  label: {
    ...typography.body2_m,
    color: palette.grey.gray2,
  },
  inputText: {
    flex: 1,
    ...typography.body1_m,
    color: palette.text,
    paddingVertical: px(10),
    paddingRight: px(20),
  },
}))