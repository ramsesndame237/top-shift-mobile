import React, { FC, memo } from 'react';
import px, { width } from '../../utils/px';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { View } from 'react-native';
import { Order } from '../../store/useOrderStore';
import { Text } from '../ui';
import Button from '../Buttons/Button';

export type OrderListItemProps = Order & {
  selected?: boolean;
  onPressDetail?: (text?: string) => void;
};

const OrderListItem: FC<OrderListItemProps> = memo((props) => {
  const { number, date, quantity, amount, details, status, onPressDetail } = props;
  const { styles, theme: { typography } } = useStyles(style);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>Order{number}</Text>
        <Text style={styles.gray}>{date}</Text>
      </View>
      <View style={styles.row2}>
        <Text style={styles.gray}>Quantité: <Text style={typography.title3_m}>{String(quantity).padStart(2, '0')}</Text></Text>
        <Text style={styles.gray}>Total Amount: <Text style={typography.title3_m}>${amount.toFixed(2)}</Text></Text>
      </View>
      <View style={styles.row3}>
        <Button
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={() => onPressDetail?.(details)}
        >
          Detail
        </Button>
        <Text style={styles.status}>{status}</Text>
      </View>
    </View>
  );
});

export default OrderListItem;

const style = createStyleSheet(({ palette, typography, space }) => ({
  container: {
    width: width - space.container * 2,
    marginHorizontal: space.container,
    shadowColor: palette.text,
    backgroundColor: palette.white,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: px(5),
    paddingVertical: px(10),
    rowGap: px(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: px(2),
    paddingBottom: px(10),
    paddingHorizontal: px(10),
    justifyContent: 'space-between',
    borderBottomColor: palette.divider
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: px(10),
  },
  row3: {
    marginTop: px(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: px(10),
  },
  gray: {
    ...typography.body1,
    color: palette.grey.gray1,
  },
  button: {
    width: px(110),
    height: px(40),
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    padding: px(5),
  },
  buttonText: {
    ...typography.body1_m,
    color: palette.background,
  },
  status: {
    ...typography.body1,
    color: palette.info,
  }
}));