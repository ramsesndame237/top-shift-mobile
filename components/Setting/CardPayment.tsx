import React, { FC, memo } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px from '../../utils/px';
import { SvgProps } from 'react-native-svg';
import { Text } from '../ui';
import BackgroundIcon from '../../assets/icons/card_background_icon.svg';


export type CardPaymentProps = {
  Icon: FC<SvgProps>;
  holderName?: string;
  expiredDate?: string;
  last4?: string;
  disabled?: boolean;
}

const CardPayment: FC<CardPaymentProps> = memo((props) => {
  const { Icon, holderName, expiredDate, last4, disabled } = props;
  const { styles, theme: { palette } } = useStyles(style);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: disabled ? palette.grey.gray5 : palette.text }
      ]}
    >
      <Icon
        width={px(40)}
        height={px(30)}
      />
      <Text style={styles.number}>****  ****  ****  {last4}</Text>
      <View style={styles.row}>
        <View>
          <Text
            style={[
              styles.label,
              { color: disabled ? palette.grey.gray3 : palette.grey.gray2 }
            ]}
          >
            Card Holder Name
          </Text>
          <Text style={styles.value}>{holderName}</Text>
        </View>
        <View>
          <Text
            style={[
              styles.label,
              { color: disabled ? palette.grey.gray3 : palette.grey.gray2 }
            ]}
          >
            Expiry Date
          </Text>
          <Text style={styles.value}>{expiredDate}</Text>
        </View>
      </View>
      <View style={styles.background}>
        <BackgroundIcon />
      </View>
    </View>
  );
});

export default CardPayment;

const style = createStyleSheet(({ typography, palette }) => ({
  container: {
    position: 'relative',
    shadowColor: palette.text,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    padding: px(20),
    borderRadius: px(10),
  },
  number: {
    marginTop: px(20),
    ...typography.title2,
    color: palette.white,
  },
  label: {
    ...typography.body2_m,
    marginBottom: px(5),
  },
  value: {
    ...typography.body1_m,
    color: palette.white,
  },
  background: {
    position: 'absolute',
    right: px(-10),
    bottom: 0,
  },
  row: {
    marginTop: px(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
}));
