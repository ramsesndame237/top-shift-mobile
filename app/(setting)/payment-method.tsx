import React, { Fragment, useMemo, useState } from 'react';
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Header from '../../components/Headers/Header';
import px from '../../utils/px';
import { ListRenderItemInfo, View } from 'react-native';
import AddIcon from '../../assets/icons/add_icon.svg';
import IconButton from '../../components/Buttons/IconButton';
import MastercardIcon from '../../assets/icons/mastercard_icon.svg';
import VisaIcon from '../../assets/icons/visa_icon.svg';
import Animated, { LinearTransition } from 'react-native-reanimated';
import CardPaymentSetting, { CardPaymentSettingProps } from '../../components/Setting/CardPaymentSetting';
import { router } from 'expo-router';


export default function PaymentMethodScreen() {
  const { styles, theme: { palette } } = useStyles(style);
  const [selectedCard, setSelectedCard] = useState<number>(1);

  const renderItem = useMemo(() => ({ item }: ListRenderItemInfo<CardPaymentSettingProps>) => (
    <CardPaymentSetting
      {...item}
      onPress={() => setSelectedCard(item.id ?? -1)}
    />
  ), []);

  return (
    <Fragment>
      <Header
        backButton
        subtitle={'Payment method'}
        subtitleStyle={styles.title}
      />
      <Animated.FlatList
        data={[
          {
            id: 1,
            Icon: MastercardIcon,
            holderName: 'John Doe',
            expiredDate: '12/2023',
            last4: '1234',
            checked: selectedCard === 1,
          },
          {
            id: 2,
            Icon: VisaIcon,
            holderName: 'John Doe',
            expiredDate: '09/2028',
            last4: '0955',
            checked: selectedCard === 2,
          },
        ]}
        itemLayoutAnimation={
          LinearTransition.
            springify()
            .damping(20)
        }
        showsVerticalScrollIndicator={false}
        style={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={() => <View style={styles.footer} />}
        renderItem={renderItem}
      />
      <IconButton
        Icon={AddIcon}
        style={styles.icon}
        backgroundColor={palette.white}
        styleBox={styles.iconBox}
        onPress={() => router.push('/(setting)/new-payment')}
      />
    </Fragment>
  );
}

const style = createStyleSheet(({ typography, palette }) => ({
  title: {
    ...typography.subtitle_m,
    color: palette.text,
  },
  container: {
    marginTop: px(20),
  },
  footer: {
    height: px(100),
  },
  separator: {
    height: px(20),
  },
  icon: {
    position: 'absolute',
    bottom: px(20),
    right: px(16),
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
