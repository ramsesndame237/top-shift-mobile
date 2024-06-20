import React, { FC, memo, useCallback } from 'react';
import { Image, Pressable, TouchableWithoutFeedback, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Text } from '../ui';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px, { width } from '../../utils/px';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { router } from 'expo-router';

type ProductItemProps = {
  id: number;
  src: any;
  Icon: FC<SvgProps>;
  title: string;
  price: number;
  onPress?: (id: number) => void;
  discountPercentage?:number
}

const ProductItem: FC<ProductItemProps> = memo((props) => {
  const { id, src, Icon, title, price, onPress,discountPercentage } = props;
  const { styles, theme: { palette, typography } } = useStyles(style);

  const active = useSharedValue(false);

  const onNavigate = useCallback(() => {
    router.push({ pathname: '/(product)/detail', params: { id } })
  }, [id]);

  const uas = useAnimatedStyle(() => ({
    opacity: 1,
    transform: [{ scale: withSpring(active.value ? 1.1 : 1) }]
  }), [])
console.log(`thsis is the image ${src}`)
  return (
    <TouchableWithoutFeedback
      onPress={onNavigate}
    >
      <View style={styles.container}>

        <View style={styles.imageContainer}>
          <Image
              source={ {uri:src}}
              style={styles.image}
          />
          <Animated.View style={[styles.iconContainer, uas]}>
            <Pressable
              onPressIn={() => (active.value = true)}
              onPressOut={() => (active.value = false)}
              onPress={() => onPress?.(1)}
            >
              <Icon
                fill={palette.white}
              />
            </Pressable>
          </Animated.View>
        </View>
        <Text numberOfLines={2} ellipsizeMode='head' style={{ color: '#1A1E26',overflow:'hidden' }}>{title}</Text>
       <View style={{flexDirection:'row',justifyContent:'space-between'}}>
         <Text style={styles.price}>{`${(price + ((price * (discountPercentage ?? 0))/100 )).toFixed(2)}$`}</Text>
         <Text style={styles.reducePrice}>{`${price}$`}</Text>
       </View>
      </View>
    </TouchableWithoutFeedback>
  )
});


const style = createStyleSheet(({ palette }) => ({
  container: {
    // paddingBottom: px(10),
    width:(width / 2) - px(20),
    marginBottom:px(20)
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    width:'100%',
    borderRadius: px(5),
    marginBottom: px(10),
    borderWidth:1,
    borderColor:palette.primary
  },
  iconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: px(20),
    bottom: px(10),
    width: px(40),
    height: px(40),
    borderRadius: px(5),
    backgroundColor: palette.divider,

  },
  image: {
    // width: '100%',
    height:px(145),
    width:px(145),
    resizeMode: 'contain',

  },
  price:{
    fontSize: px(12),
    fontFamily: 'SF700',
    textDecorationLine:'line-through',
    color:'#9D9EA2'

  },
  reducePrice:{
    fontSize: px(14),
    fontFamily: 'SF700',
    color:'#EB2606'
  }
}));

export default ProductItem;