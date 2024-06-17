import React, { Fragment } from 'react';
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Header from '../../components/Headers/Header';
import { ScrollViewContainer } from '../../components/ui';
import px, { height } from '../../utils/px';
import { View } from 'react-native';
import Button from '../../components/Buttons/Button';
import CardAddress from '../../components/Checkout/CardAddress';
import CardEditable from '../../components/Checkout/CardEditable';
import CardSummary from '../../components/Checkout/CardSummary';
import { router } from 'expo-router';


export default function CheckoutScreen() {
  const { styles } = useStyles(style);

  return (
    <Fragment>
      <Header
        backButton
        subtitle={'Check out'}
        subtitleStyle={styles.title}
      />
      <ScrollViewContainer style={styles.scroll}>
        <View style={styles.container}>
          <CardAddress
            editable
            title={'Shipping Address'}
            label={'Bruno Fernandes'}
            text={'25 rue Robert Latouche, Nice, 06200, Côte D’azur, France'}
          />
          <CardEditable
            title={'Payment'}
            src={require('../../assets/images/mastercard.png')}
            text={'**** **** **** 1234'}
          />
          <CardEditable
            title={'Delivery method'}
            src={require('../../assets/images/dhl.png')}
            text={'Fast (2-3days)'}
          />
          <CardSummary
            items={[
              {
                label: 'Subtotal',
                value: '$ 300.00'
              },
              {
                label: 'Shipping',
                value: '$ 0.00'
              },
              {
                label: 'Discount',
                value: '$ 0.00'
              },
              {
                label: 'Total',
                value: '$ 300.00'
              },

            ]}
          />
        </View>
      </ScrollViewContainer>
      <View style={styles.btnContainer}>
        <Button
          style={styles.button}
          onPress={() => router.push('/(order)/submit-order')}
        >
          SUBMIT ORDER
        </Button>
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
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: px(20)
  },
  btnContainer: {
    position: 'absolute',
    alignItems: 'center',
    columnGap: px(10),
    bottom: 0,
    left: 0,
    right: 0,
    padding: px(20),
    rowGap: px(20),
    backgroundColor: palette.background,
    borderTopLeftRadius: px(50),
    borderTopRightRadius: px(50),
  },
  button: {
    width: '100%',
  }
}));
