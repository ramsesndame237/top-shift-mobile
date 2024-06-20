import React, { Fragment } from 'react';
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Header from '../../components/Headers/Header';
import OrderTabView from '../../components/Order/OrderTabView';
import { Text } from '../../components/ui';
import { View } from 'react-native';
import { width } from '../../utils/px';
import OrderList from '../../components/Order/OrderList';


export default function MyOrdersScreen() {
  const { styles } = useStyles(style);

  return (
    <Fragment>
      <Header
        backButton
        subtitle={'My Orders'}
        subtitleStyle={styles.title}
      />
      <OrderTabView
        items={[
          { index: 0, title: 'Delivered' },
          { index: 2, title: 'Pending' },
          { index: 3, title: 'Canceled' },
        ]}
      >
        <View style={styles.child}>
          <OrderList />
        </View>
        <View style={styles.child}>
          <Text>Pending</Text>
        </View>
        <View style={styles.child}>
          <Text>Canceled</Text>
        </View>
      </OrderTabView>
    </Fragment>
  );
}

const style = createStyleSheet(({ typography, palette }) => ({
  title: {
    ...typography.subtitle_m,
    color: palette.text,
  },
  child: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  }
}));
