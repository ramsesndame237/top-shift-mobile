import React, { FC } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px, { height } from '../../utils/px';
import { router, useLocalSearchParams } from 'expo-router';
import useProductStore from '../../store/useProductStore';
import IconButton from '../../components/Buttons/IconButton';
import ChevronLeftIcon from '../../assets/icons/chevron_left_icon.svg';
import ProductColors from './ProductColors';
import ProductImages from './ProductImages';


const ProductOption: FC = () => {
  const { styles } = useStyles(style);
  const { products } = useProductStore();
  const { id } = useLocalSearchParams();
  const product = products.find(product => product.id === Number(id));

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <IconButton
          onPress={router.back}
          Icon={ChevronLeftIcon}
          fill={'none'}
          style={styles.icon}
          styleBox={styles.iconBox}
        />
        <ProductColors
          colors={[
            '#d8ba8a',
            '#fffcec',
            '#d8ba8a',
          ]}
        />
      </View>
      <View style={styles.imageContainer}>
        <ProductImages
          images={[
            require('../../assets/images/chair.png'),
            require('../../assets/images/desk.png'),
            require('../../assets/images/stand.png'),
          ]}
        />
      </View>
    </View>
  );
}

export default ProductOption;


const style = createStyleSheet(({ palette, space }) => ({
  container: {
    position: 'relative',
    marginLeft: space.container,
    height: height / 2,
  },
  menuContainer: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 2,
    rowGap: px(50),
    marginTop: px(100),
  },
  icon: {
    elevation: 2,
    width: px(40),
    height: px(40),
    padding: 0,
    borderRadius: px(8),
    backgroundColor: palette.background,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
  },
  iconBox: {
    padding: 0,
    width: '100%',
    height: '100%'
  },
  imageContainer: {
    alignItems: 'flex-end',
    paddingLeft: px(25),
  }
}));