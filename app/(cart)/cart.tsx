import React, { Fragment, useMemo } from 'react';
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Header from '../../components/Headers/Header';
import ListItem, { ListItemProps } from '../../components/Favorite/ListItem';
import { Text, ViewContainer } from '../../components/ui';
import px from '../../utils/px';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import Button from '../../components/Buttons/Button';
import InputDiscount from '../../components/form/InputDiscount';
import { router } from 'expo-router';
import Animated, { LinearTransition } from 'react-native-reanimated';
import useProductStore from "../../store/product.store";


export default function CartScreen() {
  const { styles, theme: { typography } } = useStyles(style);
  const { product } = useProductStore();

  const renderItem = useMemo(() => ({ item }: ListRenderItemInfo<ListItemProps>) => (
    <ListItem
      cart
      id={item.id}
      src={item.src}
      title={item.title}
      price={item.price}
    />
  ), []);

  return (
    <Fragment>
      <Header
        backButton
        // subtitle={'My Cart'}
        subtitleStyle={styles.title}
      />
      <ViewContainer style={styles.container}>
        {/*<FlatList*/}
        {/*  data={}*/}
        {/*  showsVerticalScrollIndicator={false}*/}
        {/*  ItemSeparatorComponent={() => <View style={styles.divider} />}*/}
        {/*  ListFooterComponent={() => <View style={styles.footer} />}*/}
        {/*  renderItem={renderItem}*/}
        {/*/>*/}
      </ViewContainer>
      <Animated.View
        layout={LinearTransition}
        style={styles.btnContainer}
      >
        <InputDiscount />
        <View style={styles.row}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={typography.title3_b}>$ 300.00</Text>
        </View>
        <Button
          onPress={() => router.push('/(cart)/checkout')}
          style={styles.button}
        >
          Add all to my cart
        </Button>
      </Animated.View>
    </Fragment>
  );
}

const style = createStyleSheet(({ typography, palette }) => ({
  title: {
    ...typography.subtitle_m,
    color: palette.text,
  },
  container: {
    marginTop: px(20),
  },
  divider: {
    height: px(1),
    marginVertical: px(20),
    backgroundColor: palette.divider
  },
  footer: {
    height: px(250),
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: px(20)
  },
  totalText: {
    ...typography.title3,
    color: palette.grey.gray2,
  },
  btnContainer: {
    position: 'absolute',
    alignItems: 'center',
    columnGap: px(10),
    bottom: 0,
    left: 0,
    right: 0,
    padding: px(20),
    rowGap: px(20),
    backgroundColor: palette.background,
    borderTopLeftRadius: px(50),
    borderTopRightRadius: px(50),
  },
  button: {
    width: '100%',
  }
}));
