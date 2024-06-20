import React, { Fragment, useMemo } from 'react';
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Header from '../../components/Headers/Header';
import px, { width } from '../../utils/px';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import Button from '../../components/Buttons/Button';
import RatingCard from '../../components/Review/RatingCard';
import RatingReviewListItem, { RatingReviewListItemProps } from '../../components/Review/RatingReviewListItem';
import { router } from 'expo-router';


export default function RatingReviewScreen() {
  const { styles } = useStyles(style);

  const renderItem = useMemo(() => ({ item }: ListRenderItemInfo<RatingReviewListItemProps>) => (
    <RatingReviewListItem
      {...item}
    />
  ), []);

  return (
    <Fragment>
      <Header
        backButton
        subtitle={'Rating & Review'}
        subtitleStyle={styles.title}
      />
      <RatingCard
        src={require('../../assets/images/desk.png')}
        title={'Sushi Express'}
        rating={4.5}
        reviewNumber={100}
      />
      <FlatList
        data={[
          {
            src: require('../../assets/images/user2.png'),
            username: 'John Doe',
            rating: 5,
            text: 'The food was great! I loved the sushi and the sashimi. The delivery was fast and the food was still warm. I would definitely order again!',
            date: '2 days ago'
          },
          {
            src: require('../../assets/images/user.jpeg'),
            username: 'Jane Doe',
            rating: 4,
            text: 'The food was great! I loved the sushi and the sashimi. The delivery was fast and the food was still warm. I would definitely order again!',
            date: '2 days ago'
          },
          {
            src: require('../../assets/images/user.jpeg'),
            username: 'John Doe',
            rating: 5,
            text: 'The food was great! I loved the sushi and the sashimi. The delivery was fast and the food was still warm. I would definitely order again!',
            date: '2 days ago'
          },
        ]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListFooterComponent={() => <View style={styles.footer} />}
        renderItem={renderItem}
      />
      <Button
        style={styles.button}
        onPress={() => router.push('/(review)/new-review')}
      >
        Write a review
      </Button>
    </Fragment>
  );
}

const style = createStyleSheet(({ typography, palette, space }) => ({
  title: {
    ...typography.subtitle_m,
    color: palette.text,
  },
  divider: {
    height: px(20),
  },
  footer: {
    height: px(150),
  },
  button: {
    position: 'absolute',
    bottom: px(20),
    alignSelf: 'center',
    width: width - (space.container * 2),
  }
}));
