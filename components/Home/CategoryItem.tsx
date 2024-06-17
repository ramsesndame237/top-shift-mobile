import React, { FC, memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px from '../../utils/px';
import { Text } from '../ui';
import { SvgProps } from 'react-native-svg';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

type CategoryItemProps = {
  id: number;
  title: string;
  Icon: FC<SvgProps>;
  active?: boolean;
  onPress?: (id: number) => void;
}

const CategoryItem: FC<CategoryItemProps> = memo((props) => {
  const { id, active, title, Icon, onPress } = props;
  const { styles, theme: { palette, typography } } = useStyles(style);

  const uas = useAnimatedStyle(() => ({
    backgroundColor: withTiming(active ? palette.primary : palette.disabled),
  }))

  return (
    <TouchableOpacity
      activeOpacity={.9}
      onPress={() => onPress?.(id)}
      style={styles.container}
    >
      <Animated.View style={[styles.iconContainer, uas]}>
        <Icon
          width={px(40)}
          height={px(40)}
          stroke={active ? palette.background : palette.grey.gray1}
          fill={active ? palette.background : 'transparent'}
        />
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
    width: px(90),
    alignItems: 'center',
    rowGap: px(5),
  },
  iconContainer: {
    padding: px(5),
    borderRadius: px(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default CategoryItem;