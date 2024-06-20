import React, { Fragment } from 'react';
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Header from '../../components/Headers/Header';
import { ScrollViewContainer } from '../../components/ui';
import px, { height } from '../../utils/px';
import { View } from 'react-native';
import CardAddress from '../../components/Checkout/CardAddress';
import AddIcon from '../../assets/icons/add_icon.svg';
import IconButton from '../../components/Buttons/IconButton';
import { router } from 'expo-router';


export default function ShippingAddressScreen() {
  const { styles, theme: { palette } } = useStyles(style);

  return (
    <Fragment>
      <Header
        backButton
        subtitle={'Shipping address'}
        subtitleStyle={styles.title}
      />
      <ScrollViewContainer style={styles.scroll}>
        <View style={styles.container}>
          <CardAddress
            checkbox
            checkedText={'Use as the shipping address'}
            title={'Shipping Address'}
            label={'Bruno Fernandes'}
            text={'25 rue Robert Latouche, Nice, 06200, Côte D’azur, France'}
          />
          <CardAddress
            checkbox
            checkedText={'Use as the shipping address'}
            title={'Shipping Address'}
            label={'Bruno Fernandes'}
            text={'25 rue Robert Latouche, Nice, 06200, Côte D’azur, France'}
          />
          <CardAddress
            checkbox
            checkedText={'Use as the shipping address'}
            title={'Shipping Address'}
            label={'Bruno Fernandes'}
            text={'25 rue Robert Latouche, Nice, 06200, Côte D’azur, France'}
          />
        </View>
      </ScrollViewContainer>
      <View style={styles.btnContainer}>
        <IconButton
          onPress={() => router.push('/(setting)/new-new-shipping-address')}
          Icon={AddIcon}
          style={styles.icon}
          backgroundColor={palette.white}
          styleBox={styles.iconBox}
        />
      </View>
    </Fragment>
  );
}

const style = createStyleSheet(({ typography, palette }) => ({
  title: {
    ...typography.subtitle_m,
    color: palette.text,
  },
  container: {
    rowGap: px(20),
    marginTop: px(20),
    marginBottom: px(20),
  },
  scroll: {
    flex: 0,
    maxHeight: height / 1.2,
  },
  btnContainer: {
    position: 'absolute',
    alignItems: 'center',
    columnGap: px(10),
    bottom: px(20),
    right: px(16),
    rowGap: px(20),
  },
  icon: {
    elevation: 4,
    width: px(60),
    height: px(60),
    padding: 0,
    borderRadius: px(60),
    shadowColor: palette.text,
    backgroundColor: palette.white,
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
}));
