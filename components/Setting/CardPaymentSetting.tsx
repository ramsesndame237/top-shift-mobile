import React, { FC, memo } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px from '../../utils/px';
import { SvgProps } from 'react-native-svg';
import CardPayment from './CardPayment';
import Checkbox from '../form/Checkbox';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Pressable, View } from 'react-native';

export type CardPaymentSettingProps = {
  id?:number;
  Icon: FC<SvgProps>;
  holderName?: string;
  expiredDate?: string;
  last4?: string;
  checked?: boolean;
  onPress?: () => void;
}


const CardPaymentSetting: FC<CardPaymentSettingProps> = memo((props) => {
  const { Icon, holderName, expiredDate, last4, checked, onPress } = props;
  const { styles } = useStyles(style);
  const active = useSharedValue(false);
  const uas = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(active.value ? 1.02 : 1) }],
  }), []);

  return (
    <Pressable
      onPressIn={() => (active.value = true)}
      onPressOut={() => (active.value = false)}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Animated.View style={[uas]}>
          <CardPayment
            Icon={Icon}
            holderName={holderName}
            expiredDate={expiredDate}
            last4={last4}
            disabled={!checked}
          />
        </Animated.View>
        <Checkbox
          checked={props.checked}
          onChecked={props.onPress}
          labelStyle={styles.label}
          label={'Use as default payment method'}
        />
      </View>
    </Pressable>
  );
});

export default CardPaymentSetting;

const style = createStyleSheet(({ typography, palette, space }) => ({
  container: {
    rowGap: px(15),
    marginHorizontal: space.container
  },
  label: {
    ...typography.body1,
    color: palette.text,
  }
}));