import React, {Fragment, useState} from 'react';
import {Image, ScrollView, View} from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useLocalSearchParams } from 'expo-router';
import ProductOption from '../../components/Product/ProductOption';
import { Text } from '../../components/ui';
import px from '../../utils/px';
import QuantityComponent from '../../components/Product/QuantityComponent';
import ReviewIcon from '../../assets/icons/review_icon.svg';
import FavoriteIcon from '../../assets/icons/favorite_icon.svg';
import IconButton from '../../components/Buttons/IconButton';
import Button from '../../components/Buttons/Button';
import useProductStore from "../../store/product.store";
import {t} from "../../locale/i18n";
import ProductList from "../../components/Home/ProductList";
import Animated, {runOnJS, useAnimatedScrollHandler} from "react-native-reanimated";
import {WIDTH} from "../../components/Product/ProductImages";
import ProductItem from "../../components/Home/ProductItem";
import ShoppingIcon from "../../assets/icons/shopping_icon.svg";
import {Product} from "../../utils/types";


export default function ProductDetailScreen() {
  const { styles, theme: { typography, palette } } = useStyles(style);
  const { product,setCart,cart } = useProductStore();
  const { id } = useLocalSearchParams();
  const products = product.find(product => product.id === Number(id));
  const [activeIndex, setActiveIndex] = useState(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    const index = Math.round(event.contentOffset.x / WIDTH);
    runOnJS(setActiveIndex)(index);
  });
  const topsProduct = product.filter(product => product.category === 'tops');
  const WIDTH_OFFSET = topsProduct.map((_, i) => WIDTH * i);
  console.log("this is the tops products",topsProduct)
  console.log("this is the total products", product)
  const handleUpdateCart = () =>{
    // setCart([...cart,{product:productCart,quantity:quatity,priceTotal:quatity}])
  }
   return (
    <Fragment>
      <ScrollView>
        <View style={styles.container}>
          <ProductOption />
          <View style={styles.content}>
            <Text style={typography.title2_m}>{products?.title}</Text>
            <View style={styles.row1}>
              <Text style={styles.reducePrice}>{products?.price}$</Text>
              <Text style={styles.price}>{`${((products?.price ?? 0) + (((products?.price ?? 0) * (products?.discountPercentage ?? 0))/100 )).toFixed(2)}$`}</Text>
              <QuantityComponent
                  quantity={1}
              />
            </View>
            <View style={styles.row2}>
              <ReviewIcon />
              <Text style={typography.title3_m}>{products?.rating}</Text>
              <Text style={styles.textReview}>({products?.reviews?.length} reviews)</Text>
            </View>
            <Text style={styles.text}>
              {products?.description}
            </Text>
          </View>
          <View>
            <View style={styles.containerOtherProduct}>
              <Text style={typography.body1_eb}>
                {t('translate_key_choose_product')}
              </Text>
              <Animated.ScrollView
                  horizontal
                  pagingEnabled
                  snapToOffsets={WIDTH_OFFSET}
                  showsHorizontalScrollIndicator
                  // style={{gap:'15px'}}
                  onScroll={onScroll}



              >
                {topsProduct.map((productElement, index) => (
                    <View key={index} style={{marginRight:px(10)}}>
                      <ProductItem
                          id={productElement.id}
                          title={productElement.title}
                          price={productElement.price}
                          src={productElement.images[0]}
                          discountPercentage={productElement.discountPercentage ?? 0}
                          Icon={ShoppingIcon}
                      />

                    </View>
                ))}
              </Animated.ScrollView>
            </View>

          </View>
        </View>
      </ScrollView>

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
          onPress={()=>handleUpdateCart()}
        >
          {t('translate_key_add_to_cart')}
        </Button>
      </View>
    </Fragment>
  );
}


const style = createStyleSheet(({ typography, palette, space }) => ({
  container: {
    position: 'relative',
  },
  containerOtherProduct: {
    position: 'relative',
    paddingLeft:px(10),
    paddingBottom:px(20),
    paddingTop:px(20)
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
  reducePrice:{
    fontSize: px(28),
    fontFamily: 'SF700',
    color:'#EB2606'
  },
  price:{
    fontSize: px(12),
    fontFamily: 'SF700',
    textDecorationLine:'line-through',
    color:'#9D9EA2'

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
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: px(10),
    marginTop:px(50),
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