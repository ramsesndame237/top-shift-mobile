import React, { FC, memo } from 'react';
import { Platform, Pressable, TouchableNativeFeedback, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px from '../../utils/px';
import { Text } from '../ui';
import ChevronRightIcon from '../../assets/icons/chevron_right_icon.svg';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type SettingRowTouchableProps = {
  title?: string;
  groups: {
    label?: string;
    onPress?: () => void;
  }[];
}

const SettingRowTouchable: FC<SettingRowTouchableProps> = memo(({ title, groups }) => {
  const { styles, theme: { typography, palette } } = useStyles(style);
  const active = useSharedValue(false);
  const uas = useAnimatedStyle(() => ({
    backgroundColor: withTiming(active.value ? palette.grey.grey1_10 : palette.white)
  }), []);

  if (Platform.OS === 'ios') {
    return (
      <View>
        <Text style={styles.title}>{title}</Text>
        {groups.map((group, index) => (
          <View
            key={index}
            style={styles.container}
          >
            <Pressable
              onPressIn={() => (active.value = true)}
              onPressOut={() => (active.value = false)}
              onPress={group.onPress}
            >
              <Animated.View style={[styles.content, uas]}>
                <Text style={typography.body1_m}>{group.label}</Text>
                <ChevronRightIcon
                  width={px(34)}
                  height={px(34)}
                />
              </Animated.View>
            </Pressable>
          </View>
        ))}
      </View>
    );
  }
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      {groups.map((group, index) => (
        <View
          key={index}
          style={styles.container}
        >
          <TouchableNativeFeedback onPress={group.onPress}>
            <View style={styles.content}>
              <Text style={typography.body1_m}>{group.label}</Text>
              <ChevronRightIcon
                width={px(34)}
                height={px(34)}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      ))}
    </View>
  );
});

export default SettingRowTouchable;

const style = createStyleSheet(({ typography, palette }) => ({
  title: {
    ...typography.title3_m,
    color: palette.grey.gray1,
    marginBottom: px(10),
  },
  label: {
    ...typography.body2,
    color: palette.grey.gray2,
  },
  container: {
    borderRadius: px(5),
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: px(10),
    marginTop: px(10),
    paddingRight: px(-10),
    backgroundColor: palette.white,
    shadowColor: palette.text,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 2,
    borderRadius: px(5),
  },
}));