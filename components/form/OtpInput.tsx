import React, { createRef, memo, useCallback, useRef, useState } from 'react'
import { TextInput as RNTextInput, View } from 'react-native'
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { width } from '../../utils/px';
import TextInput from './TextInput';

type Props = {
  value?: string;
  error?: boolean;
  onChange?: (value: string) => void;
}

const INPUT_SIZE = Array(5)
  .fill(1)
  .map((_, i) => i);


const OtpInput = memo<Props>((props) => {

  const { styles } = useStyles(style);

  const [error, setError] = useState(props.error);

  const values = useRef<string[]>(INPUT_SIZE.map(() => ''));
  const [inputs] = useState(() => {
    return INPUT_SIZE.map(() => createRef<RNTextInput>())
  });

  const onChange = useCallback((text: string, index: number) => {
    if (text.length === 1) {
      inputs[index + 1]?.current?.focus();
    } else {
      inputs[index - 1]?.current?.focus();
    }
    values.current[index] = text;
    if (values.current.every(text => text !== '')) {
      setError(false)
    }
    props.onChange?.(values.current.join(''));
  }, [inputs, error]);

  return (
    <View style={styles.container}>
      {INPUT_SIZE.map(index => (
        <View
          key={index}
          style={{ width: '18%' }}
        >
          <TextInput
            ref={inputs[index]}
            textAlign={'center'}
            style={styles.input}
            maxLength={1}
            autoFocus={index === 0}
            onChangeText={(text) => onChange(text, index)}
            error={props.error ? values.current[index] === '' : false}
            onKeyPress={e => {
              if (e.nativeEvent.key !== 'Backspace') return;
              inputs[index - 1]?.current?.focus();
            }}
          />
        </View>
      ))}
    </View>
  )
});

const style = createStyleSheet(({ palette, space }) => ({
  container: {
    width: width - space.container * 2,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  input: {
    backgroundColor: palette.background,
    paddingHorizontal: 0,
    paddingRight: 0
  }
}))
export default OtpInput