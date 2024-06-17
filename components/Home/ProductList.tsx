import React, { FC, memo } from 'react';
import { View, FlatList } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ProductItem from './ProductItem';
import ShoppingIcon from '../../assets/icons/shopping_icon.svg';
import useProductStore from '../../store/useProductStore';
import px from '../../utils/px';
import Animated, { LinearTransition } from 'react-native-reanimated';

type ProductListProps = {
  products?: any[];
}

const ProductList: FC<ProductListProps> = memo((props) => {
  const { styles } = useStyles(style);
  const { products } = useProductStore();

  return (
    <Animated.View
      layout={LinearTransition}
      style={styles.container}
    >
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => `${item.id}-${item.title}`}
        columnWrapperStyle={styles.columnWrapperStyle}
        ListFooterComponent={() => <View style={styles.listFooterComponentStyle} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductItem
            id={item.id}
            title={item.title}
            price={item.price}
            src={item.src}
            Icon={ShoppingIcon}
          />
        )}
      />
    </Animated.View>
  )
});

const style = createStyleSheet(({ space }) => ({
  container: {
    marginTop: px(30),
    marginHorizontal: space.container,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between'
  },
  listFooterComponentStyle: {
    marginBottom: px(210)
  }
}));

export default ProductList;