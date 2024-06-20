import React, { FC, memo } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px from '../../utils/px';
import { View } from 'react-native';
import { Text } from '../ui';

type CardSummaryProps = {
  items: {
    label: string;
    value: string;
  }[]
}

const CardSummary: FC<CardSummaryProps> = memo((props) => {
  const { items } = props;
  const { styles, theme: { typography } } = useStyles(style);

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View
          key={index}
          style={styles.row}
        >
          <Text style={styles.label}>{item.label}</Text>
          <Text style={typography.title3_m}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
});

export default CardSummary;

const style = createStyleSheet(({ typography, palette }) => ({
  container: {
    rowGap: px(10),
    padding: px(20),
    backgroundColor: palette.white,
    shadowColor: palette.text,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    borderRadius: px(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    ...typography.title3,
    color: palette.grey.gray1,
  },
}));