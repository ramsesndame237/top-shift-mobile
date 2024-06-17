import React, { Fragment } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Header from '../../components/Headers/Header';
import CardPayment from '../../components/Setting/CardPayment';
import MastercardIcon from '../../assets/icons/mastercard_icon.svg';
import px, { height } from '../../utils/px';
import { ScrollViewContainer } from '../../components/ui';
import Button from '../../components/Buttons/Button';
import { TextInputPayment, TextInputSelectPayment } from '../../components/form/TextInputPayment';
import useKeyboard from '../../hooks/useKeyboard';


export default function NewPaymentScreen() {
  const { styles } = useStyles(style);
  const { visible } = useKeyboard();

  return (
    <Fragment>
      <Header
        backButton
        subtitle={'Add payment method'}
        subtitleStyle={styles.title}
      />
      <View style={styles.card}>
        <CardPayment
          Icon={MastercardIcon}
          holderName={'John Doe'}
          expiredDate={'12/2023'}
          last4={'1234'}
        />
      </View>
      <ScrollViewContainer style={styles.scroll}>
        <View style={styles.container}>
          <TextInputPayment
            label={'CardHolder Name'}
            placeholder={'EX: John Doe'}
          />
          <TextInputPayment
            creditCard
            label={'Card Number'}
            placeholder={'**** **** **** 1234'}
          />
          <View style={styles.row}>
            <TextInputPayment
              disabled
              label={'CVV'}
              placeholder={'***'}
              style={{ flex: 1 }}
            />
            <TextInputPayment
              expirationDate
              style={{ flex: 1 }}
              label={'Expired Date'}
              placeholder={'MM/YY'}
            />
          </View>
          <TextInputSelectPayment
            label={'Card Type'}
            placeholder={'Select Card Type'}
            options={[
              { label: 'Mastercard', value: 'mastercard' },
              { label: 'Visa', value: 'visa' },
              { label: 'American Express', value: 'american_express' },
            ]}
          />
        </View>
      </ScrollViewContainer>
      {!visible ?
        <Button
          layoutAnimation
          style={styles.btn}
        >
          ADD NEW CARD
        </Button> :
        null
      }
    </Fragment>
  )
};


const style = createStyleSheet(({ palette, typography, space }) => ({
  container: {
    marginTop: px(50),
    rowGap: px(10),
  },
  title: {
    ...typography.subtitle_m,
    color: palette.text,
  },
  card: {
    marginTop: px(20),
    marginHorizontal: space.container,
  },
  scroll: {
    flex: 0,
    maxHeight: height / 1.2
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: px(20),
  },
  btn: {
    position: 'absolute',
    left: space.container,
    right: space.container,
    bottom: px(20),
  }
}));