import React, { FC, memo } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px from '../../utils/px';
import { View } from 'react-native';
import { Text } from '../ui';
import IconButton from '../Buttons/IconButton';
import EditIcon from '../../assets/icons/edit_icon.svg';
import Checkbox from '../form/Checkbox';

type CardAddressProps = {
  title?: string;
  label?: string;
  text?: string;
  checkbox?: boolean;
  checkedText?: string;
  editable?: boolean;
  onPress?: () => void;
  onChecked?: (checked: boolean) => void;
}

const CardAddress: FC<CardAddressProps> = memo((props) => {
  const { title, label, text, checkedText, checkbox, editable, onPress, onChecked } = props;
  const { styles, theme: { typography, palette } } = useStyles(style);

  return (
    <View style={styles.container}>
      {editable ?
        <View style={styles.row}>
          <Text style={styles.label}>{title}</Text>
          <IconButton
            Icon={EditIcon}
            styleBox={styles.icon}
            onPress={onPress}
          />
        </View> :
        null
      }
      {checkbox ?
        <Checkbox
          label={checkedText}
          labelStyle={styles.label}
          onChecked={onChecked}
        /> :
        null
      }
      <View style={styles.cardContainer}>
        <View style={styles.rowLabel}>
          <Text style={typography.title3_b}>{label}</Text>
          {checkbox ?
            <IconButton
              Icon={EditIcon}
              styleBox={styles.icon}
              backgroundColor={palette.white}
              onPress={onPress}
            /> :
            null
          }
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
});

export default CardAddress;

const style = createStyleSheet(({ typography, palette }) => ({
  container: {
    rowGap: px(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rowLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: px(2),
    borderBottomColor: palette.background,
    paddingBottom: px(10),
    paddingHorizontal: px(20),
    marginBottom: px(10),
  },
  label: {
    ...typography.title3_m,
    color: palette.grey.gray1,
  },
  text: {
    ...typography.body1,
    color: palette.grey.gray1,
    paddingHorizontal: px(20),
  },
  icon: {
    width: px(35),
    height: px(35),
    padding: 0,
    borderRadius: px(10),
  },
  cardContainer: {
    backgroundColor: palette.white,
    shadowColor: palette.text,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    paddingVertical: px(20),
    borderRadius: px(10),
  }
}));