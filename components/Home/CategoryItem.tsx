import React, { FC, memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px from '../../utils/px';
import { Text } from '../ui';
import { SvgProps } from 'react-native-svg';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

type CategoryItemProps = {
  title: string;
  // Icon: FC<SvgProps>;
  active?: boolean;
  onPress?: (title: string) => void;
}

const CategoryItem: FC<CategoryItemProps> = memo((props) => {
  const {  active, title,  onPress } = props;
  const { styles, theme: { palette, typography } } = useStyles(style);

  const uas = useAnimatedStyle(() => ({
    backgroundColor: withTiming(active ? palette.primary : palette.disabled),
  }))

  return (
    <TouchableOpacity
      activeOpacity={.9}
      onPress={() => onPress?.(title)}
      style={styles.container}
    >
      <Animated.View style={[styles.iconContainer, uas]}>

      </Animated.View>
      <Text
        style={[
          {
            ...active ? typography.body1_sb : typography.body1,
            color: active ? palette.primary : palette.grey.gray1,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
});

const style = createStyleSheet(() => ({
  container: {
    width: px(150),
    alignItems: 'center',
    rowGap: px(5),
  },
  iconContainer: {
    padding: px(5),
    borderRadius: px(5),
    width:px(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default CategoryItem;