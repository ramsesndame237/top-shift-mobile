import React, { FC, Fragment, ReactNode, memo, useCallback, useRef, useState } from 'react';
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../ui';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import px, { width } from '../../utils/px';

type Item = {
  index: number;
  title: string;
}

type OrderTabViewProps = {
  items: Item[];
  children?: React.ReactNode[];
  onPress?: (index: number) => void;
}

const WIDTH = width - px(32);
const ITEM_WIDTH = WIDTH / 3;


const OrderTabView: FC<OrderTabViewProps> = memo((props) => {
  const { items, onPress, children } = props;
  const { styles, theme: { typography, palette } } = useStyles(style);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollRef = useRef<Animated.ScrollView>(null);

  const uas = useAnimatedStyle(() => ({
    left: withSpring(currentIndex * ITEM_WIDTH, { damping: 10 })
  }), [currentIndex]);

  const handlePress = useCallback((index: number) => {
    setCurrentIndex(index);
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
    onPress?.(items[index].index);
  }, []);

  return (
    <Fragment>
      <View style={styles.tab}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={.8}
            style={styles.item}
            onPress={() => handlePress(index)}
          >
            <Text
              style={[
                typography.body1_m,
                { color: currentIndex === index ? palette.primary : palette.grey.gray1 }
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[styles.indicator, uas]}
        >
          <View style={styles.minus} />
        </Animated.View>
      </View>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      >
        {children?.map((child, index) => (
          <RenderChild
            key={index}
            child={child}
          />
        ))}
      </Animated.ScrollView>
    </Fragment>
  );
});


const RenderChild = memo(({ child }: { child: ReactNode }) => child);


const style = createStyleSheet(({ palette, space }) => ({
  tab: {
    marginVertical: px(20),
    marginHorizontal: space.container,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    width: ITEM_WIDTH,
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    alignItems: 'center',
    width: ITEM_WIDTH,
    left: 0,
    bottom: px(-10),
  },
  minus: {
    width: px(40),
    height: px(4),
    backgroundColor: palette.primary,
    borderRadius: px(4),
  },
}));


export default OrderTabView;