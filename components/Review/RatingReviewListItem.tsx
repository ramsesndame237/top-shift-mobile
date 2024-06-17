import React, { FC, memo } from 'react';
import { createStyleSheet, useStyles } from "react-native-unistyles";
import px from '../../utils/px';
import { Image, View } from 'react-native';
import { Text } from '../ui';
import ReviewIcon from '../../assets/icons/review_icon.svg';

export type RatingReviewListItemProps = {
  src: any;
  username?: string;
  rating?: number;
  text?: string;
  date?: string;
}


const RatingReviewListItem: FC<RatingReviewListItemProps> = memo((props) => {
  const { src, text, username, rating, date } = props;
  const { styles, theme: { typography } } = useStyles(style);

  return (
    <View>
      <Image
        source={src}
        style={styles.image}
      />
      <View style={styles.container}>
        <View style={styles.row}>
          <View>
            <Text style={typography.body1_m}>{username}</Text>
            <View style={styles.row_star}>
              {Array.from({ length: rating ?? 0 }).map((_, index) => (
                <ReviewIcon
                  key={index}
                  width={px(15)}
                />
              ))}
            </View>
          </View>
          <Text style={styles.date}>{date}</Text>
        </View>
        <Text style={typography.body1}>{text}</Text>
      </View>
    </View>
  )
})


export default RatingReviewListItem;

const style = createStyleSheet(({ palette, typography, space }) => ({
  container: {
    borderRadius: px(10),
    padding: px(20),
    rowGap: px(10),
    backgroundColor: palette.white,
    shadowColor: palette.text,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginHorizontal: space.container,
  },
  image: {
    zIndex: 1,
    alignSelf: 'center',
    marginBottom: -px(25),
    width: px(50),
    height: px(50),
    borderRadius: px(50),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: px(10),
  },
  row_star: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: px(1),
  },
  date: {
    ...typography.body1,
    color: palette.grey.gray1,
  }
}))

