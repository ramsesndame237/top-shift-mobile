import React, { FC, memo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px from '../../utils/px';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


type ProductColorsProps = {
  colors?: string[];
}

type CircleItemProps = {
  color?: string;
  onPress: () => void;
  selected?: boolean;
}

const ProductColors: FC<ProductColorsProps> = memo(({ colors }) => {
  const { styles } = useStyles(style);
  const [currentIndex, setCurrentIndex] = useState<number>();

  return (
    <View style={styles.container}>
      {colors?.map((color, index) => (
        <CircleItem
          key={index}
          color={color}
          selected={currentIndex === index}
          onPress={() => setCurrentIndex(index)}
        />
      ))}
    </View>
  )
});


const CircleItem: FC<CircleItemProps> = memo(({ color, selected, onPress }) => {
  const { styles, theme: { palette } } = useStyles(style);
  const active = useSharedValue(false);

  const uas = useAnimatedStyle(() => ({
    borderColor: withTiming(active.value || selected ? palette.grey.gray2 : palette.disabled),
    transform: [{ scale: withTiming(active.value ? 1.2 : 1) }],
    backgroundColor: color
  }), [color, selected])

  return (
    <Pressable
      onPressIn={() => (active.value = true)}
      onPressOut={() => (active.value = false)}
      onPress={onPress}
    >
      <Animated.View
        style={[styles.circle, uas]}
      />
    </Pressable>
  )
});



export default ProductColors;

const style = createStyleSheet(({ palette }) => ({
  container: {
    backgroundColor: palette.background,
    borderRadius: px(40),
    shadowColor: palette.text,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    padding: px(10),
    rowGap: px(20)
  },
  circle: {
    width: px(30),
    height: px(30),
    borderRadius: px(30),
    backgroundColor: palette.primary,
    borderWidth: px(5),
  }
}));