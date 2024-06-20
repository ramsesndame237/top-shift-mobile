import React, { FC, Fragment, memo, useCallback, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { TextInput, TextInputProps, TouchableWithoutFeedback, View } from 'react-native';
import ChevronBottomIcon from '../../assets/icons/chevron_bottom_icon.svg';
import { Text } from '../ui';
import px from '../../utils/px';
import ModalSheet from '../ui/ModalSheet';
import SelectItem from '../Setting/SelectItem';

type SelectOptions = {
  label: string;
  value: any;
}

type InputProps = TextInputProps & {
  label?: string;
  disabled?: boolean;
  expirationDate?: boolean;
  creditCard?: boolean;
}

type InputSelectProps = TextInputProps & {
  placeholder?: string;
  options?: SelectOptions[];
  label?: string;
  disabled?: boolean;
}

export const TextInputPayment: FC<InputProps> = memo((props) => {
  const { label, disabled, creditCard, expirationDate, onChangeText, ...rest } = props;
  const { styles, theme: { palette } } = useStyles(style);
  const [text, setText] = useState("");

  const handleTextChange = useCallback((value: string) => {
    const cleanedText = value.replace(/\D/g, '');
    if (!creditCard && !expirationDate) {
      onChangeText?.(value);
      return;
    }

    if (creditCard) {
      if (cleanedText.length > 19) return;
      let maskedText = "";
      if (cleanedText.length >= 4) { maskedText = `${cleanedText.slice(0, 4)}-` }
      else { maskedText = cleanedText }
      if (cleanedText.length >= 8) { maskedText += `${cleanedText.slice(4, 8)}-` }
      else { maskedText += cleanedText.slice(4) }
      if (cleanedText.length >= 12) { maskedText += `${cleanedText.slice(8, 12)}-` }
      else { maskedText += cleanedText.slice(8) }
      if (cleanedText.length >= 16) { maskedText += `${cleanedText.slice(12, 16)}` }
      else { maskedText += cleanedText.slice(12) }

      if (value.endsWith('-')) { maskedText = maskedText.slice(0, -1) };

      setText(maskedText);
      onChangeText?.(maskedText.replaceAll('-', ''));
    }
    else if (expirationDate) {
      if (cleanedText.length > 4) return;
      let maskedText = "";
      if (cleanedText.length >= 2) { maskedText = `${cleanedText.slice(0, 2)}/` }
      else { maskedText = cleanedText }
      if (cleanedText.length >= 4) { maskedText += `${cleanedText.slice(2, 4)}` }
      else { maskedText += cleanedText.slice(2) }

      if (value.endsWith('/')) { maskedText = maskedText.slice(0, -1) };
      const [mm, yy] = maskedText.split('/');
      const YY = Number(String(new Date().getFullYear()).slice(2));
      if (Number(mm) > 12 || ((yy?.length ?? 0) === 2 && Number(yy ?? YY) < YY)) return;

      setText(maskedText);
      onChangeText?.(maskedText);
    }


  }, [creditCard, expirationDate]);


  return (
    <View
      style={[
        styles.container,
        disabled ? styles.disbled : styles.border,
        rest.style
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          selectionColor={palette.primary}
          editable={!disabled}
          style={[
            styles.input,
            { color: disabled ? palette.grey.grey1_70 : palette.text }
          ]}
          placeholderTextColor={palette.grey.grey1_70}
          keyboardType={creditCard || expirationDate ? 'numeric' : undefined}
          value={creditCard || expirationDate ? text : undefined}
          onChangeText={handleTextChange}
          {...rest}
        />
      </View>
    </View>
  );
});





export const TextInputSelectPayment: FC<InputSelectProps> = memo((props) => {
  const { label, options, disabled, placeholder, ...rest } = props;
  const { styles, theme: { palette } } = useStyles(style);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>()

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleSelect = useCallback((value: string) => {
    setValue(options?.find(option => option.value === value)?.label);
    handleClose();
  }, []);

  return (
    <Fragment>
      <TouchableWithoutFeedback onPress={handleOpen}>
        <View
          style={[
            styles.container,
            disabled ? styles.disbled : styles.border,
            rest.style
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>{label}</Text>
            <Text
              style={[
                styles.selectText,
                { color: disabled ? palette.grey.grey1_70 : palette.text },
              ]}
            >
              {value ?? placeholder}
            </Text>
          </View>
          <ChevronBottomIcon
            width={px(20)}
            height={px(20)}
            stroke={disabled ? palette.grey.grey1_70 : palette.text}
          />
        </View>
      </TouchableWithoutFeedback>
      {!disabled ?
        <ModalSheet
          open={open}
          onClose={handleClose}
          style={{ height: (options?.length ?? 1) * 70 }}
        >
          <View style={styles.sheet}>
            {options?.map((option, index) => (
              <SelectItem
                key={index}
                selected={value === option.label}
                value={option.value}
                label={option.label}
                onSelect={handleSelect}
              />
            ))}
          </View>
        </ModalSheet> :
        null
      }
    </Fragment>
  );
});



const style = createStyleSheet(({ palette, typography }) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: px(5),
    borderWidth: px(1),
    borderRadius: px(5),
    paddingHorizontal: px(16),
    paddingVertical: px(10),
  },
  disbled: {
    backgroundColor: palette.disabled,
    borderColor: 'transparent'
  },
  border: {
    borderColor: palette.divider,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: px(10),
  },
  label: {
    ...typography.caption_m,
    color: palette.grey.grey1_70,
  },
  input: {
    flex: 1,
    fontSize: px(16),
  },
  sheet: {
    paddingTop: px(5),
  },
  selectText: {
    flex: 1,
    fontSize: px(16),
    rowGap: px(5),
  }
}));