import React, { FC, Fragment, memo, useMemo, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { ListRenderItemInfo, View } from 'react-native';
import Animated from 'react-native-reanimated';
import OrderListItem, { OrderListItemProps } from './OrderListItem';
import useOrderStore from '../../store/useOrderStore';
import ModalSheet from '../ui/ModalSheet';
import px from '../../utils/px';
import { Text } from '../ui';


const OrderList: FC = memo(() => {
  const { styles } = useStyles(style);
  const { orders } = useOrderStore();
  const [text, setText] = useState<string>();

  const renderItem = useMemo(() => ({ item }: ListRenderItemInfo<OrderListItemProps>) => (
    <OrderListItem
      {...item}
      onPressDetail={setText}
    />
  ), []);

  return (
    <Fragment>
      <Animated.FlatList
        data={orders}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <View style={styles.footer} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderItem}
      />
      <ModalSheet
        open={!!text}
        onClose={() => setText(undefined)}
        style={{ height: 200 }}
      >
        <Text style={styles.text}>
          {text}
        </Text>
      </ModalSheet>
    </Fragment>
  );
});

export default OrderList;

const style = createStyleSheet(({ typography }) => ({
  footer: {
    height: px(100),
  },
  separator: {
    height: px(20),
  },
  text: {
    ...typography.body1,
    padding: px(20)
  }
}));