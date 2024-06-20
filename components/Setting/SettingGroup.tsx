import React, { FC, memo } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px from '../../utils/px';
import { View } from 'react-native';
import { Text } from '../ui';
import IconButton from '../Buttons/IconButton';
import EditIcon from '../../assets/icons/edit_icon.svg';
import ButtonSwitch from '../Buttons/ButtonSwitch';

type Group = {
  label?: string;
  value?: string;
  switcher?: boolean;
  switcherValue?: boolean;
  onSwitch?: (value?: boolean) => void;
}

type SettingGroupProps = {
  title?: string;
  groups?: Group[];
  onPress?: () => void;
}

const SettingGroup: FC<SettingGroupProps> = memo((props) => {
  const { title, groups, onPress } = props;
  const { styles, theme: { typography } } = useStyles(style);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <IconButton
          Icon={EditIcon}
          styleBox={styles.icon}
          onPress={onPress}
        />
      </View>
      {groups?.map((group, index) => (
        <View
          key={index}
          style={styles.cardContainer}
        >
          {group.switcher ?
            <View style={styles.row2}>
              <Text style={typography.body1_m}>{group.label}</Text>
              <ButtonSwitch
                size={'small'}
                checked={group.switcherValue}
                onChecked={group.onSwitch}
              />
            </View> :
            <>
              <Text style={styles.label}>{group.label}</Text>
              <Text style={typography.body1_m}>{group.value}</Text>
            </>
          }
        </View>
      ))}
    </View>
  );
});

export default SettingGroup;

const style = createStyleSheet(({ typography, palette }) => ({
  container: {
    rowGap: px(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: px(2),
    justifyContent: 'space-between'
  },
  title: {
    ...typography.title3_m,
    color: palette.grey.gray1,
  },
  label: {
    ...typography.body2,
    color: palette.grey.gray1,
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
    elevation: 2,
    padding: px(10),
    borderRadius: px(10),
  }
}));