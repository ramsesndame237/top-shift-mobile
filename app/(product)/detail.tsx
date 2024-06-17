import React, { Fragment } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useLocalSearchParams } from 'expo-router';
import useProductStore from '../../store/useProductStore';
import ProductOption from '../../components/Product/ProductOption';
import { Text } from '../../components/ui';
import px from '../../utils/px';
import QuantityComponent from '../../components/Product/QuantityComponent';
import ReviewIcon from '../../assets/icons/review_icon.svg';
import FavoriteIcon from '../../assets/icons/favorite_icon.svg';
import IconButton from '../../components/Buttons/IconButton';
import Button from '../../components/Buttons/Button';


export default function ProductDetailScreen() {
  const { styles, theme: { typography, palette } } = useStyles(style);
  const { products } = useProductStore();
  const { id } = useLocalSearchParams();
  const product = products.find(product => product.id === Number(id));

  return (
    <Fragment>
      <View style={styles.container}>
        <ProductOption />
        <View style={styles.content}>
          <Text style={typography.title2_m}>Minimal Stand</Text>
          <View style={styles.row1}>
            <Text style={typography.title2_b}>$ 250</Text>
            <QuantityComponent
              quantity={0}
            />
          </View>
          <View style={styles.row2}>
            <ReviewIcon />
            <Text style={typography.title3_m}>4.5</Text>
            <Text style={styles.textReview}>(50 reviews)</Text>
          </View>
          <Text style={styles.text}>
            Minimal Stand is made of by natural wood. The design that is very simple and minimal. This is truly one of the best furnitures in any family for now. With 3 different colors, you can easily select the best match for your home.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint minus dignissimos velit dolorum deserunt optio autem consequatur.
          </Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <IconButton
          Icon={FavoriteIcon}
          fill={'none'}
          stroke={palette.primary}
          style={styles.icon}
          backgroundColor={palette.gray}
          rippleColor={palette.background}
          styleBox={styles.iconBox}
        />
        <Button
          style={styles.button}
        >
          Add to cart
        </Button>
      </View>
    </Fragment>
  );
}


const style = createStyleSheet(({ typography, palette, space }) => ({
  container: {
    position: 'relative',
  },
  content: {
    marginTop: px(20),
    rowGap: px(20),
    marginHorizontal: space.container
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: px(10),
  },
  textReview: {
    ...typography.body1_m,
    color: palette.grey.gray1,
    marginLeft: px(5)
  },
  text: {
    ...typography.body1,
    color: palette.grey.gray1,
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
  icon: {
    borderRadius: px(5),
  },
  iconBox: {
    width: px(60),
    height: px(60),
  },
  button: {
    flex: 1,
    height: px(60),
  }
}));