import React, { FC, memo, useState } from 'react';
import { Image, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px, { width } from '../../utils/px';
import Animated, { runOnJS, useAnimatedScrollHandler, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export const WIDTH = width / 1.1;

type ProductImagesProps = {
  images: any[];
}
type DotItemProps = {
  active: boolean;
}


const ProductImages: FC<ProductImagesProps> = memo(({ images }) => {
  const { styles } = useStyles(style);
  const [activeIndex, setActiveIndex] = useState(0);

  const WIDTH_OFFSET = images.map((_, i) => WIDTH * i);

  const onScroll = useAnimatedScrollHandler((event) => {
    const index = Math.round(event.contentOffset.x / WIDTH);
    runOnJS(setActiveIndex)(index);
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        snapToOffsets={WIDTH_OFFSET}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}

      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{uri:image}}
            style={styles.image}

          />
        ))}
      </Animated.ScrollView>
      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <DotItem
            key={index}
            active={index === activeIndex}
          />
        ))}
      </View>
    </View>
  )
});


const DotItem: FC<DotItemProps> = memo(({ active }) => {

  const { styles, theme: { palette } } = useStyles(style);
  const uas = useAnimatedStyle(() => ({
    backgroundColor: withTiming(active ? palette.primary : palette.background),
    width: withTiming(active ? 50 : 30),
  }), [active]);

  return (
    <Animated.View
      style={[styles.dot, uas]}
    />
  )
});


export default ProductImages;


const style = createStyleSheet(({ palette, space }) => ({
  container: {
    overflow: 'hidden',
    position: 'relative',
    backgroundColor:'#d9d9d9',
    borderBottomLeftRadius: px(50),
  },
  image: {
    width: WIDTH,
    height: '100%',
    resizeMode: 'contain',
  },
  dotContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: px(8),
    bottom: px(20),
    right: px(50),
  },
  price:{
    fontSize: px(12),
    fontFamily: 'SF700',
    textDecorationLine:'line-through',
    color:'#9D9EA2'

  },
  dot: {
    height: px(5),
    borderRadius: px(5),
  }
}));