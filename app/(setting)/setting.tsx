import React, { Fragment } from 'react';
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Header from '../../components/Headers/Header';
import { ScrollViewContainer } from '../../components/ui';
import px, { height } from '../../utils/px';
import { View } from 'react-native';
import AddIcon from '../../assets/icons/add_icon.svg';
import IconButton from '../../components/Buttons/IconButton';
import SettingGroup from '../../components/Setting/SettingGroup';
import SettingRowTouchable from '../../components/Setting/SettingRowTouchable';


export default function ShippingAddressScreen() {
  const { styles, theme: { palette } } = useStyles(style);

  return (
    <Fragment>
      <Header
        backButton
        subtitle={'Setting'}
        subtitleStyle={styles.title}
      />
      <ScrollViewContainer style={styles.scroll}>
        <View style={styles.container}>
          <SettingGroup
            title={'Personnal Information'}
            groups={[
              {
                label: 'Name',
                value: 'John Doe'
              },
              {
                label: 'Email',
                value: 'bruno203@gmail.com'
              }
            ]}
          />
          <SettingGroup
            title={'Password'}
            groups={[
              {
                label: 'Name',
                value: '***********'
              }
            ]}
          />
          <SettingGroup
            title={'Notifications'}
            groups={[
              {
                switcher: true,
                label: 'Sales',
                value: '***********'
              },
              {
                switcher: true,
                label: 'New arrivals',
              },
              {
                switcher: true,
                label: 'Delivery status changes',
              },
            ]}
          />
          <SettingRowTouchable
            title={'Help & Support'}
            groups={[
              {
                label: 'FAQ',
              },
              {
                label: 'Contact us',
              },
            ]}
          />
        </View>
      </ScrollViewContainer>
      <IconButton
        Icon={AddIcon}
        style={styles.icon}
        backgroundColor={palette.white}
        styleBox={styles.iconBox}
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
    rowGap: px(40),
    marginTop: px(20),
    marginBottom: px(20),
  },
  scroll: {
    flex: 0,
    maxHeight: height,
    paddingBottom: px(100),
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
