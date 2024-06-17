import React, { Fragment, useMemo } from 'react';
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Header from '../../../components/Headers/Header';
import px from '../../../utils/px';
import { ListRenderItemInfo, View } from 'react-native';
import useNotificationStore from '../../../store/useNotificationStore';
import ListItem, { ListItemProps } from '../../../components/Notification/ListItem';
import Animated, { LinearTransition } from 'react-native-reanimated';


export default function NotificationScreen() {
  const { styles } = useStyles(style);
  const { notifications } = useNotificationStore();

  const renderItem = useMemo(() => ({ item }: ListRenderItemInfo<ListItemProps>) => (
    <ListItem
      id={item.id}
      src={item.src}
      title={item.title}
      text={item.text}
      type={item.type}
    />
  ), []);

  return (
    <Fragment>
      <Header
        searchButton
        searchType={'notifications'}
        subtitle={'Notification'}
        subtitleStyle={styles.title}
      />
      <Animated.FlatList
        data={notifications}
        itemLayoutAnimation={
          LinearTransition.
            springify()
            .damping(20)
        }
        showsVerticalScrollIndicator={false}
        style={styles.container}
        ListFooterComponent={() => <View style={styles.footer} />}
        renderItem={renderItem}
      />
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
  footer: {
    height: px(100),
  }
}));
