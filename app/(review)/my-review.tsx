import React, {Fragment, useEffect, useMemo, useState} from 'react';
import { createStyleSheet, useStyles } from "react-native-unistyles";
import px from '../../utils/px';
import { ListRenderItemInfo, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import ReviewItem from '../../components/Review/ReviewItem';
import Header from '../../components/Headers/Header';
import useProductStore from "../../store/product.store";
import {Review} from "../../utils/types";


export default function MyReviewScreen() {
  const { styles } = useStyles(style);
  const { product } = useProductStore();

  const [reviews,setReviews] = useState<Review[]>([])

  useEffect(()=>{
    setReviews(product.flatMap((element)=>(element.reviews)))
  },[product])
  const renderItem = useMemo(() => ({ item }: ListRenderItemInfo<Review>) => (
    <ReviewItem
     author_email={item.reviewerEmail}
     date={item.date}
     rating={item.rating}
     author_name={item.reviewerName}
     comment={item.comment}
    />
  ), []);

  return (
    <Fragment>
      <Header
        backButton
        searchButton
        searchType={'reviews'}
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
