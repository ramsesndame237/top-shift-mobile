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
}

const ProductItem: FC<ProductItemProps> = memo((props) => {
  const { id, src, Icon, title, price, onPress } = props;
  const { styles, theme: { palette, typography } } = useStyles(style);

  const active = useSharedValue(false);

  const onNavigate = useCallback(() => {
    router.push({ pathname: '/(product)/detail', params: { id } })
  }, [id]);

  const uas = useAnimatedStyle(() => ({
    opacity: 1,
    transform: [{ scale: withSpring(active.value ? 1.1 : 1) }]
  }), [])

  return (
    <TouchableWithoutFeedback
      onPress={onNavigate}
    >
      <View style={styles.container}>

        <View style={styles.imageContainer}>
          <Image
            source={src}
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
        <Text style={{ color: palette.grey.gray1 }}>{title}</Text>
        <Text style={typography.body1_b}>{`${price.toFixed(2)} $`}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
});


const style = createStyleSheet(({ palette }) => ({
  container: {
    paddingBottom: px(20),
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    width: (width / 2) - px(30),
    borderRadius: px(5),
    marginBottom: px(10),
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
    width: '100%',
    resizeMode: 'cover',
  }
}));

export default ProductItem;