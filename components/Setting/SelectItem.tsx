import React, { FC, memo, useCallback } from 'react';
import { Pressable, StyleProp, TextStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Text } from '../ui';

type SelectItemProps = {
  selected?: boolean;
  onSelect?: (value?: any) => void;
  label?: string;
  value?: any;
  style?: StyleProp<TextStyle>;
}

const TextAnimated = Animated.createAnimatedComponent(Text);

const SelectItem: FC<SelectItemProps> = memo((props) => {
  const { onSelect, selected, label, value, style } = props;
  const { styles, theme: { palette } } = useStyles(_style);
  const active = useSharedValue(false);

  const uas = useAnimatedStyle(() => {
    const isTrue = active.value || selected;
    return {
      transform: [{ scaleX: withTiming(isTrue ? 1.2 : 1) }],
      color: withTiming(isTrue ? palette.text : palette.grey.gray1),
      backgroundColor: withTiming(isTrue ? palette.grey.gray4 : palette.white),
    }
  }, [selected]);

  const onPress = useCallback(() => { onSelect?.(value) }, []);

  return (
    <Pressable
      onPressIn={() => (active.value = true)}
      onPressOut={() => (active.value = false)}
      onPress={onPress}
    >
      <TextAnimated style={[styles.text, style, uas]}>
        {label}
      </TextAnimated>
    </Pressable>
  );
});

export default SelectItem;


const _style = createStyleSheet(({ typography }) => ({
  text: {
    ...typography.body1_m,
    textAlign: 'center',
    verticalAlign: 'middle',
    height: 40
  }
}));