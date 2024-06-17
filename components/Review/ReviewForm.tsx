import React, { FC, memo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px from '../../utils/px';
import TextInput from '../form/TextInput';
import StartIcon from '../../assets/icons/start_icon.svg';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type ReviewFormProps = {
  onSubmit?: () => void;
};

type PressableIconProps = {
  selected?: boolean;
  onPress?: () => void;
}

const ReviewForm: FC<ReviewFormProps> = memo((props) => {
  const { styles } = useStyles(style);
  const [currentIndex, setCurrentIndex] = useState(-1);

  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>
        {Array(5).fill(1).map((_, i) => (
          <PressableIcon
            key={i}
            selected={i <= currentIndex}
            onPress={() => setCurrentIndex(i)}
          />
        ))}
      </View>
      <TextInput
        label={'Description'}
        placeholder={'Write your review here'}
        style={styles.input}
      />
    </View>
  )
});


const PressableAnimated = Animated.createAnimatedComponent(Pressable);

const PressableIcon: FC<PressableIconProps> = memo(({ selected, onPress }) => {
  const active = useSharedValue(false);
  const { theme: { palette } } = useStyles(style);
  const uas = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(active.value ? 1.5 : 1) }]
  }), []);


  return (
    <PressableAnimated
      onPressIn={() => (active.value = true)}
      onPressOut={() => (active.value = false)}
      onPress={onPress}
      style={[uas]}
    >
      <StartIcon
        fill={selected ? palette.primary : palette.disabled}
      />
    </PressableAnimated>
  )
});

export default ReviewForm;


const style = createStyleSheet(({ palette, typography, space }) => ({
  container: {
    flex: 1,
    rowGap: px(20),
    paddingHorizontal: space.container
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: px(5)
  },
  input: {
    height: px(200),
    paddingHorizontal: px(10),
  }
}));