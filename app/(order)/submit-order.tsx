import React from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px from '../../utils/px';
import { Text } from '../../components/ui';
import PaymentSuccessIcon from '../../assets/icons/payment_success_icon.svg';
import SuccessIcon from '../../assets/icons/success_icon.svg';
import Button from '../../components/Buttons/Button';
import { router } from 'expo-router';


export default function SubmitOrderScreen() {
  const { styles, theme: { typography } } = useStyles(style);

  return (
    <View style={styles.container}>
      <Text style={typography.title1_b}>SUCCESS!</Text>
      <View>
        <PaymentSuccessIcon width={px(300)} />
        <SuccessIcon style={styles.success_icon} />
      </View>
      <Text style={styles.text}>
        Your order will be delivered soon.Thank you for choosing our app!
      </Text>
      <Button
        style={styles.button}
        onPress={() => router.push('/(order)/rating-review')}
      >
        Track your orders
      </Button>
      <Button
        outlined
        style={styles.button}
        onPress={() => router.replace('/(tabs)')}
      >
        BACK TO HOME
      </Button>
    </View>
  );
}

const style = createStyleSheet(({ palette, typography, space }) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: px(20),
    paddingHorizontal: space.container
  },
  success_icon: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: -px(20),
  },
  text: {
    ...typography.body1,
    color: palette.grey.gray1,
    textAlign: 'center',
    marginVertical: px(20),
  },
  button: {
    width: '100%',
  }
}));