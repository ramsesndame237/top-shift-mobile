import React, { Fragment, useMemo } from 'react';
import { createStyleSheet, useStyles } from "react-native-unistyles";
import px from '../../utils/px';
import { ListRenderItemInfo, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import useProductStore, { Review } from '../../store/useProductStore';
import ReviewItem from '../../components/Review/ReviewItem';
import Header from '../../components/Headers/Header';


export default function MyReviewScreen() {
  const { styles } = useStyles(style);
  const { reviews } = useProductStore();

  const renderItem = useMemo(() => ({ item }: ListRenderItemInfo<Review>) => (
    <ReviewItem
      src={item.product.src}
      title={item.product.title}
      text={item.text}
      price={item.product.price}
      rating={item.rating}
      date={item.date}
    />
  ), []);

  return (
    <Fragment>
      <Header
        backButton
        searchButton
        searchType={'reviews'}
        subtitle={'My reviews'}
        subtitleStyle={styles.title}
      />
      <Animated.FlatList
        data={reviews}
        itemLayoutAnimation={
          LinearTransition
            .springify()
            .damping(20)
        }
        showsVerticalScrollIndicator={false}
        style={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
  separator: {
    height: px(10),
  },
  footer: {
    height: px(100),
  },
}));
