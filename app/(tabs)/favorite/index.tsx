import React, { Fragment, useMemo } from 'react';
import { createStyleSheet, useStyles } from "react-native-unistyles";
import CartIcon from '../../../assets/icons/cart_icon.svg';
import Header from '../../../components/Headers/Header';
import ListItem, { ListItemProps } from '../../../components/Favorite/ListItem';
import { ViewContainer } from '../../../components/ui';
import px from '../../../utils/px';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import useProductStore from '../../../store/useProductStore';
import Button from '../../../components/Buttons/Button';
import { router } from 'expo-router';


export default function HomeScreen() {
  const { styles } = useStyles(style);
  const { favorites } = useProductStore();

  const renderItem = useMemo(() => ({ item }: ListRenderItemInfo<ListItemProps>) => (
    <ListItem
      id={item.id}
      src={item.src}
      title={item.title}
      price={item.price}
    />
  ), []);

  return (
    <Fragment>
      <Header
        searchButton
        searchType={'favorites'}
        searchPlaceholder={'Typing to search favorites'}
        RightContent={CartIcon}
        subtitle={'Favorites'}
        subtitleStyle={styles.title}
      />
      <ViewContainer style={styles.container}>
        <FlatList
          data={favorites}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          ListFooterComponent={() => <View style={styles.footer} />}
          renderItem={renderItem}
        />
      </ViewContainer>
      <View style={styles.btnContainer}>
        <Button
          onPress={() => router.push('/(cart)/cart')}
          style={styles.button}
        >
          Checkout
        </Button>
      </View>
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
    height: px(100),
  },
  btnContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: px(10),
    bottom: 0,
    left: 0,
    right: 0,
    padding: px(20),
    backgroundColor: palette.background,
    borderTopLeftRadius: px(50),
    borderTopRightRadius: px(50),
  },
  button: {
    flex: 1,
  }
}));
