import React, { Fragment } from 'react';
import { createStyleSheet, useStyles } from "react-native-unistyles";
import ExitIcon from '../../../assets/icons/exit_icon.svg';
import Header from '../../../components/Headers/Header';
import { ScrollViewContainer } from '../../../components/ui';
import { router } from 'expo-router';
import px, { height } from '../../../utils/px';
import { View } from 'react-native';
import UserProfile from '../../../components/Profile/UserProfile';
import ProfileRowItem from '../../../components/Profile/ProfileRowItem';


export default function HomeScreen() {
  const { styles } = useStyles(style);

  return (
    <Fragment>
      <Header
        searchButton
        RightContent={ExitIcon}
        onPressRight={()=>router.push('/(auth)/login')}
        subtitleStyle={styles.title}
      />
      <UserProfile
        src={require('../../../assets/images/user.jpeg')}
        username={'John Doe'}
        email={'gabingabin12@yahoo.fr'}
      />
      <ScrollViewContainer style={styles.container}>
        <View style={styles.content}>
          {[
            {
              title: 'My orders',
              label: 'Already have 10 orders',
              onPress:()=>router.push('/(order)/my-orders')
            },
            {
              title: 'Shipping addresses',
              label: '3 addresses',
              onPress: () => router.push('/(setting)/shipping-address')
            },
            {
              title: 'Payment methods',
              label: 'Visa **34',
              onPress: () => router.push('/(setting)/payment-method')
            },
            {
              title: 'My reviews',
              label: 'Reviews for 4 items',
              onPress: () => router.push('/(review)/my-review')
            },
            {
              title: 'Setting',
              label: 'Notifications, Password, FAQ, Contact',
              onPress: () => router.push('/(setting)/setting')
            }
          ].map((item, index) => (
            <ProfileRowItem
              key={index}
              title={item.title}
              label={item.label}
              onPress={item.onPress}
            />
          ))}
        </View>
      </ScrollViewContainer>
    </Fragment>
  );
}

const style = createStyleSheet(({ typography, palette }) => ({
  title: {
    ...typography.subtitle_m,
    color: palette.text,
  },
  container: {
    flex: 0,
    height: height / 1.5,
  },
  content: {
    marginTop: px(20),
    paddingBottom: px(50),
    rowGap: px(10),
  }
}));
