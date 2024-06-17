import React, { FC, memo, useCallback, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px from '../../utils/px';
import { View } from 'react-native';
import TextInput from './TextInput';
import IconButton from '../Buttons/IconButton';
import ChevronRightIocn from '../../assets/icons/chevron_right_icon.svg';

type InputDiscountProps = {
  onPress?: (disount: string) => void;
}


const InputDiscount: FC<InputDiscountProps> = memo(({ onPress }) => {
  const { styles, theme: { palette } } = useStyles(style);
  const [text, setText] = useState('');

  const onSubmit =useCallback(() => {
    onPress?.(text);
  }, [text]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Enter your promo code'}
        containerStyle={styles.containerStyle}
        style={styles.input}
        onChangeText={setText}
      />
      <IconButton
        Icon={ChevronRightIocn}
        style={styles.icon}
        styleBox={styles.iconBox}
        stroke={palette.white}
        backgroundColor={palette.black}
        onPress={onSubmit}
      />
    </View>
  );
});

export default InputDiscount;

const style = createStyleSheet(({ palette }) => ({
  container: {
    position: 'relative',
    width: '100%',
  },
  containerStyle: {
    borderBottomWidth: 0,
    backgroundColor: palette.white,
    borderRadius: px(10),
    shadowColor: palette.text,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    paddingLeft: px(20),
  },
  input: {
    marginVertical: px(5),
    fontFamily: 'SF400'
  },
  icon: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    padding: 0,
    borderRadius: px(5),
  },
  iconBox: {
    flex: 1,
    borderRadius: px(10),
  },
}));