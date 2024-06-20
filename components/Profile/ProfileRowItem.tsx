import React, { FC, memo } from 'react';
import { Platform, Pressable, TouchableNativeFeedback, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px from '../../utils/px';
import { Text } from '../ui';
import ChevronRightIcon from '../../assets/icons/chevron_right_icon.svg';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type ProfileRowItemProps = {
  title?: string;
  label?: string;
  onPress?: () => void;
  // Props type definition
}

const ProfileRowItem: FC<ProfileRowItemProps> = memo(({ title, label, onPress }) => {
  const { styles, theme: { typography, palette } } = useStyles(style);
  const active = useSharedValue(false);
  const uas = useAnimatedStyle(() => ({
    backgroundColor:   withTiming(active.value ? palette.grey.grey1_10: palette.white)
  }), []);

  if (Platform.OS === 'ios') {
    return (
      <Pressable
        onPressIn={()=>(active.value = true)}
        onPressOut={()=>(active.value = false)}
        onPress={onPress}
      >
        <Animated.View style={[styles.container, uas]}>
          <View>
            <Text style={typography.title3_b}>{title}</Text>
            <Text style={styles.label}>{label}</Text>
          </View>
          <ChevronRightIcon
            width={px(34)}
            height={px(34)}
          />
        </Animated.View>
      </Pressable>
    );
  }
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.container}>
        <View>
          <Text style={typography.title3_b}>{title}</Text>
          <Text style={styles.label}>{label}</Text>
        </View>
        <ChevronRightIcon
          width={px(34)}
          height={px(34)}
        />
      </View>
    </TouchableNativeFeedback>
  );
});

export default ProfileRowItem;

const style = createStyleSheet(({ typography, palette }) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: px(10),
    paddingVertical: px(20),
    paddingRight: px(-10),
    backgroundColor: palette.white,
    shadowColor: palette.text,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  label: {
    ...typography.body2,
    color: palette.grey.gray2,
  }
}));