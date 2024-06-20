import React, { memo, useCallback, useState } from 'react';
import TextInput from './TextInput';
import Clock from '../../assets/icons/clock.svg';
import { useStyles } from "react-native-unistyles";;

type Props = {
  value?: string;
  error?: boolean;
  onChange?: (value: string) => void;
  onError?: (error: boolean) => void;
}


const TextInputTime = memo<Props>((props) => {

  const { value, error, onChange, onError } = props;
  const { theme: { palette } } = useStyles();

  const [time, setTime] = useState(value ?? '');

  const formatTime = useCallback((input: string) => {
    const numericInput = input.replace(/[^\d]/g, '');
    if (numericInput.length <= 2) {
      return numericInput;
    } else {
      return `${numericInput.slice(0, 2)}:${numericInput.slice(2, 4)}`;
    }
  }, [time]);

  const handleTextChange = (input: string) => {
    const formattedTime = formatTime(input);
    if ((Number(formattedTime.split(':')[0]) > 23 || Number(formattedTime.split(':')[1]) > 59)) {
      if (!error) {
        onError?.(true);
      };
    }
    if ((Number(formattedTime.split(':')[0]) <= 23 && Number(formattedTime.split(':')[1]) <= 59)) {
      if (error) {
        onError?.(false);
      }
    }
    setTime(formattedTime);
    onChange?.(formattedTime);
  };

  return (
    <TextInput
      label={'Zeitpläne'}
      autoFocus
      error={error}
      placeholder={'Verwaltungszeiten'}
      keyboardType={'numeric'}
      value={time}
      onChangeText={handleTextChange}
      maxLength={5}
      startIcon={Clock}
      containerStyle={{ backgroundColor: palette.white }}
      labelStyle={{ color: palette.black }}
    />
  )
})

export default TextInputTime