import React, { FC, memo, useCallback } from 'react';
import { createStyleSheet, useStyles } from "react-native-unistyles";
import px from '../../utils/px';
import { Image, View } from 'react-native';
import { Text } from '../ui';
import TrashIcon from '../../assets/icons/trash_icon.svg';
import useNotificationStore from '../../store/useNotificationStore';
import SwepeableView from '../ui/SwepeableView';
import Animated, { SharedValue, interpolate, useAnimatedStyle } from 'react-native-reanimated';

export type ListItemProps = {
  id: number;
  src?: any;
  title?: string;
  text: string;
  type?: 'new' | 'priority';
}


const ListItem: FC<ListItemProps> = memo((props) => {
  const { id, src, title, text, type } = props;
  const { styles, theme: { palette, typography } } = useStyles(style);
  const { removeNotification } = useNotificationStore();

  const color = type === 'new' ? palette.success : palette.error;

  const onDelete = useCallback(() => {
    removeNotification(id);
  }, []);

  return (
    <SwepeableView
      triggerX={-150}
      triggerColor={palette.error_light}
      renderAction={(dragX) => <RenderRightAction dragX={dragX} />}
      onAction={onDelete}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: type ? palette.grey.gray4 : palette.background }
        ]}
      >
        {src ?
          <Image
            source={src}
            style={styles.image}
          /> :
          null
        }
        <View style={styles.content}>
          <Text style={typography.body1_b}>{title}</Text>
          <Text style={typography.body2}>
            {src ?
              text.length < 120 ? text : text.slice(0, 120) + '...' :
              text.length < 200 ? text : text.slice(0, 20) + '...'
            }
          </Text>
          {type ?
            <Text style={[styles.type, { color }]}>
              {type === 'new' ? 'NEW' : 'HOT'}
            </Text> :
            null
          }
        </View>
      </View>
    </SwepeableView>
  )
});



const RenderRightAction: FC<{ dragX: SharedValue<number> }> = memo(({ dragX }) => {
  const { styles, theme: { palette } } = useStyles(style);
  const uas = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(dragX.value, [-400, 0], [1, .6]) }]
  }), []);

  return (
    <View style={styles.swepeable}>
      <Animated.View
        style={[uas]}
      >
        <TrashIcon fill={palette.error} />
      </Animated.View>
    </View>
  );
});


export default ListItem;

const style = createStyleSheet(({ typography }) => ({
  container: {
    flexDirection: 'row',
    columnGap: px(10),
    paddingHorizontal: px(16),
    paddingVertical: px(10),
    justifyContent: 'space-between',
  },
  image: {
    width: px(95),
    height: px(100),
    borderRadius: px(10)
  },
  content: {
    flex: 1,
    rowGap: px(5),
  },
  type: {
    ...typography.body1_eb,
    textAlign: 'right',
  },
  swepeable: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: px(20),
    height: '100%'
  },
}))

