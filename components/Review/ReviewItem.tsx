import React, { FC, memo } from 'react';
import { Image, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px from '../../utils/px';
import { Text } from '../ui';
import StartIcon from '../../assets/icons/start_icon.svg';

export type ReviewItemProps = {
  src?: any;
  title?: string;
  price?: number;
  rating?: number;
  date?: string;
  text?: string;
}


const ReviewItem: FC<ReviewItemProps> = memo((props) => {
  const { src, title, price, rating, date, text } = props;
  const { styles, theme: { typography, palette } } = useStyles(style);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={src}
          style={styles.image}
        />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={typography.title3_b}>$ {String(price).padEnd(2, '0')}</Text>
        </View>
      </View>
      <View style={styles.row2}>
        <View style={styles.start}>
          {Array(Number(rating)).fill(1).map((_, i) => (
            <StartIcon
              key={i}
              fill={palette.info}
              width={px(20)}
            />
          ))}
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text>{text}</Text>
    </View>
  );
});

export default ReviewItem;

const style = createStyleSheet(({ typography, palette, space }) => ({
  container: {
    marginHorizontal: space.container,
    shadowColor: palette.text,
    backgroundColor: palette.white,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: px(5),
    padding: px(10),
    rowGap: px(10),
  },
  title: {
    ...typography.title3,
    color: palette.grey.gray1,
  },
  date:{
    ...typography.caption,
    color: palette.grey.gray2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: px(10),
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: px(80),
    height: px(80),
    borderRadius: px(5),
  },
  start: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: px(5),
  }
}));