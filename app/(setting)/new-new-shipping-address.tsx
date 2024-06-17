import React, { Fragment } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Header from '../../components/Headers/Header';
import px, { height } from '../../utils/px';
import { ScrollViewContainer } from '../../components/ui';
import Button from '../../components/Buttons/Button';
import { TextInputPayment, TextInputSelectPayment } from '../../components/form/TextInputPayment';
import useKeyboard from '../../hooks/useKeyboard';


export default function NewHippingAddressScreen() {
  const { styles } = useStyles(style);
  const { visible } = useKeyboard();

  return (
    <Fragment>
      <Header
        backButton
        subtitle={'Add shipping Adress'}
        subtitleStyle={styles.title}
      />
      <ScrollViewContainer style={styles.scroll}>
        <View style={styles.container}>
          <TextInputPayment
            disabled
            label={'Full name'}
            placeholder={'EX: John Doe'}
          />
          <TextInputPayment
            disabled
            label={'Address'}
            placeholder={'EX: 25 rue Robert Latouche'}
          />
          <TextInputPayment
            label={'Zip Code (Postal Code)'}
            placeholder={'EX: Sydenham 06200'}
          />
          <TextInputSelectPayment
            disabled
            label={'Select Country'}
            placeholder={'Canada'}
            options={[
              { label: 'France', value: 'france' },
              { label: 'United States', value: 'united_states' },
              { label: 'United Kingdom', value: 'united_kingdom' },
            ]}
          />
          <TextInputSelectPayment
            label={'City'}
            placeholder={'California'}
            options={[
              { label: 'California', value: 'california' },
              { label: 'New York', value: 'new_york' },
              { label: 'Texas', value: 'texas' },
            ]}
          />
        </View>
      </ScrollViewContainer>
      {!visible ?
        <Button
          layoutAnimation
          style={styles.btn}
        >
          SAVE ADDRESS
        </Button> :
        null
      }
    </Fragment>
  )
};


const style = createStyleSheet(({ palette, typography, space }) => ({
  container: {
    marginTop: px(20),
    rowGap: px(10),
  },
  title: {
    ...typography.subtitle_m,
    color: palette.text,
  },
  scroll: {
    flex: 0,
    maxHeight: height / 1.2
  },
  btn: {
    position: 'absolute',
    left: space.container,
    right: space.container,
    bottom: px(20),
  }
}));