import React, { memo, useState } from "react";
import { TextInput as RNTextInput, View, TextInputProps, Platform, TouchableNativeFeedback, StyleProp, ViewStyle } from "react-native";
import { Text } from "../ui";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import px from "../../utils/px";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import EyeOpenIcon from '../../assets/icons/eye_icon.svg';
import EyeCloseIcon from '../../assets/icons/eye_close_icon.svg';

interface Props extends TextInputProps {
  label: string,
  error?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const TextInputPassword = memo<Props>(({ error, ...props }) => {
  const { styles, theme: { palette } } = useStyles(style);

  const [show, setShow] = useState(false);

  const active = useSharedValue(false);
  const uas = useAnimatedStyle(() => ({
    borderColor: withTiming(error ? palette.error : active.value ? palette.primary : palette.divider)
  }))

  return (
    <View style={[styles.container, props.containerStyle]}>
      <Text style={styles.label}>
        {props.label}
      </Text>
      <Animated.View
        style={[styles.row, uas]}
      >
        <RNTextInput
          secureTextEntry={!show}
          onFocus={() => (active.value = true)}
          onBlur={() => (active.value = false)}
          selectionColor={palette.primary}
          style={styles.inputText}
          {...props}
        />
        <View style={styles.btnContainer}>
          <TouchableNativeFeedback
            onPress={() => setShow(show => !show)}
            background={TouchableNativeFeedback.Ripple(palette.primary, false)}
          >
            <View style={styles.btn}>
              {show ?
                <EyeCloseIcon
                  width={px(20)}
                  height={px(20)}
                /> :
                <EyeOpenIcon
                  width={px(20)}
                  height={px(20)}
                />
              }
            </View>
          </TouchableNativeFeedback>
        </View>
      </Animated.View>
    </View>
  )
});

export default TextInputPassword;

const style = createStyleSheet(({ palette, typography }) => ({
  container: {
    width: '100%',
  },
  row: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    jcontent: 'space-between',
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
    paddingVertical: px(15),
    paddingRight: px(20)
  },
  btnContainer: {
    width: px(30),
    height: px(30),
    borderRadius: px(30),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: px(10),
    backgroundColor:palette.white
  },
  btn: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))