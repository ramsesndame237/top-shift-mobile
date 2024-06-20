import React, { Fragment } from 'react';
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Header from '../../components/Headers/Header';
import px, { width } from '../../utils/px';
import Button from '../../components/Buttons/Button';
import RatingCard from '../../components/Review/RatingCard';
import ReviewForm from '../../components/Review/ReviewForm';
import useKeyboard from '../../hooks/useKeyboard';


export default function NewReviewScreen() {
  const { styles } = useStyles(style);
  const { visible } = useKeyboard();

  return (
    <Fragment>
      <Header
        backButton
        subtitle={'Add your review'}
        subtitleStyle={styles.title}
      />
      <RatingCard
        src={require('../../assets/images/desk.png')}
        title={'Sushi Express'}
        rating={4.5}
        reviewNumber={100}
      />
      <ReviewForm />
      {!visible ?
        <Button
          style={styles.button}
        >
          COMPLETED
        </Button> :
        null
      }
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
