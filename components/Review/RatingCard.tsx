import React, { FC, Fragment, memo } from 'react';
import { Image, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px from '../../utils/px';
import { Text } from '../ui';
import ReviewIcon from '../../assets/icons/review_icon.svg';

type RatingCardProps = {
  src?: any;
  title?: string;
  rating?: number;
  reviewNumber?: number;

}

const RatingCard: FC<RatingCardProps> = memo((props) => {
  const { src, title, rating, reviewNumber } = props;
  const { styles, theme: { typography } } = useStyles(style);

  return (
    <Fragment>
      <View style={styles.container}>
        <Image
          source={src}
          resizeMode={'stretch'}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text>{title}</Text>
          <View style={styles.row}>
            <ReviewIcon />
            <Text style={typography.subtitle_b}>{String(rating).padEnd(2, '.0')}</Text>
          </View>
          <Text style={typography.title3_m}>{reviewNumber} reviews</Text>
        </View>
      </View>
      <View style={styles.divider} />
    </Fragment>
  )
});

export default RatingCard;

const style = createStyleSheet(({ palette, space }) => ({
  container: {
    marginTop: px(20),
    height: px(110),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: px(20),
    marginHorizontal: space.container
  },
  image: {
    overflow: 'hidden',
    height: px(110),
    borderRadius: px(10),
  },
  content: {
    height: '100%',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: px(5),
  },
  divider: {
    height: px(1),
    marginTop: px(15),
    marginBottom: px(20),
    backgroundColor: palette.divider,
    marginHorizontal: space.container
  }
}));