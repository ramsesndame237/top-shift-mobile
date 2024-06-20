import React, { FC, memo } from 'react';
import { createStyleSheet, useStyles } from "react-native-unistyles";
import px from '../../utils/px';
import { Image, View } from 'react-native';
import { Text } from '../ui';
import IconButton from '../Buttons/IconButton';
import CloseIcon from '../../assets/icons/close_icon.svg';
import ShoppingIcon from '../../assets/icons/shopping_icon.svg';
import QuantityComponent from '../Product/QuantityComponent';

export type ListItemProps = {
  id?: number;
  src: any;
  title?: string;
  price?: number;
  cart?: boolean;
}


const ListItem: FC<ListItemProps> = memo((props) => {
  const { id, src, title, price, cart } = props;
  const { styles, theme: { palette, typography } } = useStyles(style);

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Image
          source={src}
          style={styles.image}
        />
        <View style={styles.column}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={typography.subtitle_sb}>$ {price}</Text>
          </View>
          {cart ?
            <QuantityComponent
              quantity={1}
            /> :
            null
          }
        </View>
      </View>
      <View style={styles.column}>
        <IconButton
          Icon={CloseIcon}
          styleBox={styles.iconClose}
        />
        {!cart ?
          <IconButton
            Icon={ShoppingIcon}
            style={styles.icon}
            backgroundColor={palette.gray}
            rippleColor={palette.background}
          /> :
          null
        }
      </View>
    </View>
  )
})


export default ListItem;

const style = createStyleSheet(({ palette, typography }) => ({
  container: {
    borderRadius: px(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContent: {
    flex: 1,
    columnGap: px(10),
    flexDirection: 'row',
  },
  column: {
    justifyContent: 'space-between'
  },
  image: {
    width: px(140),
    height: px(140),
    borderRadius: px(10),
  },
  title: {
    ...typography.body1_m,
    color: palette.grey.gray2,
  },
  iconClose: {
    padding: 0,
    borderRadius: px(30),
  },
  icon: {
    width: px(35),
    height: px(35),
    padding: 0,
    borderRadius: px(10),
  }
}))

