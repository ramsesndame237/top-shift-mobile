import React, { FC, memo, useCallback, useState } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import IconButton from '../Buttons/IconButton';
import AddIcon from '../../assets/icons/add_icon.svg';
import MinusIcon from '../../assets/icons/minus_icon.svg';
import { Text } from '../ui';
import px from '../../utils/px';

type QuantityComponentProps = {
  quantity: number;
  onPriceChange?: (quantity: number) => void;
}

const QuantityComponent: FC<QuantityComponentProps> = memo(({ quantity, onPriceChange }) => {
  const { styles, theme: { typography, palette } } = useStyles(style);
  const [count, setCount] = useState(quantity);

  const onAdd = useCallback(() => {
    setCount(c => c + 1);
    onPriceChange?.(count + 1);
  }, [count]);

  const onMinus = useCallback(() => {
    if (count === 0) return;
    setCount(c => c - 1);
    onPriceChange?.(count - 1);
  }, [count]);

  return (
    <View style={styles.container}>
      <IconButton
        Icon={MinusIcon}
        style={styles.icon}
        backgroundColor={palette.gray}
        rippleColor={palette.background}
        onPress={onMinus}
      />
      <Text style={typography.title3_m}>{count}</Text>
      <IconButton
        Icon={AddIcon}
        style={styles.icon}
        backgroundColor={palette.gray}
        rippleColor={palette.background}
        onPress={onAdd}
      />
    </View>
  )
});


export default QuantityComponent;

const style = createStyleSheet(() => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: px(10),
  },
  icon: {
    padding: 0,
    borderRadius: px(5),
  }
}));