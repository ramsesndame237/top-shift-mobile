import React, { FC, ReactNode, memo } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px from '../../utils/px';
import { Image, View } from 'react-native';
import { Text } from '../ui';
import IconButton from '../Buttons/IconButton';
import EditIcon from '../../assets/icons/edit_icon.svg';

type CardEditableProps = {
  title?: string;
  src?: any;
  text?: ReactNode;
  onPress?: () => void;
}

const CardEditable: FC<CardEditableProps> = memo((props) => {
  const { title, text, src, onPress } = props;
  const { styles } = useStyles(style);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>{title}</Text>
        <IconButton
          Icon={EditIcon}
          styleBox={styles.icon}
          onPress={onPress}
        />
      </View>
      <View style={styles.cardContainer}>
        {src ?
          <Image
            source={src}
            style={styles.image}
          /> :
          null
        }
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
});

export default CardEditable;

const style = createStyleSheet(({ typography, palette }) => ({
  container: {
    rowGap: px(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  label: {
    ...typography.title3_m,
    color: palette.grey.gray1,
  },
  text: {
    ...typography.body2_b,
    color: palette.grey.gray1,
    paddingHorizontal: px(10),
  },
  icon: {
    width: px(35),
    height: px(35),
    padding: 0,
    borderRadius: px(10),
  },
  image:{

  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: px(20),
    padding: px(20),
    backgroundColor: palette.white,
    shadowColor: palette.text,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
    borderRadius: px(10),
  }
}));