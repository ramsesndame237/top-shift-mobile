import React, { FC, PropsWithChildren, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Modal, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type THeight = Record<'height', number>;
interface ModalSheetProps extends PropsWithChildren {
  open?: boolean;
  onClose?: () => void;
  style?: StyleProp<ViewStyle & THeight>;
}

const DEFAULT_HEIGHT = 400;
const OFFSET_HEIGHT = 70;
const VELOCTIY_HEIGHT = 2000;
const ANIMATION_DURATION = 400;


const ModalSheet: FC<ModalSheetProps> = (props) => {
  const { open, onClose, children, style } = props;
  const { styles } = useStyles(_style);

  const HEIGHT = (style as THeight)?.height ?? DEFAULT_HEIGHT;
  const translateY = useSharedValue(HEIGHT);
  const [show, setShow] = useState(open);

  const gestureHandler = useMemo(() =>
    Gesture
      .Pan()
      .onChange(e => {
        const y = Math.abs(e.translationY);
        if (y >= -OFFSET_HEIGHT && y <= OFFSET_HEIGHT) {
          translateY.value = e.translationY;
        }
      })
      .onEnd(e => {
        if (e.velocityY > VELOCTIY_HEIGHT && onClose) {
          translateY.value = withTiming(HEIGHT, { duration: ANIMATION_DURATION }, (finished) => {
            if (finished) {
              runOnJS(onClose)();
              runOnJS(setShow)(false);
            };
          });
        } else {
          translateY.value = withSpring(0, { damping: 10 });
        }
      }), []);

  const uas = useAnimatedStyle(() => ({
    height: HEIGHT,
    transform: [
      { translateY: translateY.value + OFFSET_HEIGHT }
    ]
  }), []);

  const onRequestClose = useCallback(() => {
    translateY.value = withTiming(HEIGHT, { duration: ANIMATION_DURATION }, (finished) => {
      if (finished && onClose) {
        runOnJS(onClose)();
        runOnJS(setShow)(false);
      };
    });
  }, []);

  useEffect(() => {
    if (open && translateY.value === HEIGHT) {
      setShow(true);
      translateY.value = withSpring(0, { damping: 20 });
    } else if (!open) {
      translateY.value = withTiming(HEIGHT, { duration: ANIMATION_DURATION }, (finished) => {
        if (finished && onClose) {
          runOnJS(onClose)();
          runOnJS(setShow)(false);
        };
      });
    }
  }, [open]);


  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={show}
      onRequestClose={onRequestClose}
      animationType={'none'}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onRequestClose}
          style={styles.clickAwayListener}
        />
        <GestureDetector gesture={gestureHandler}>
          <Animated.View
            style={[styles.content, style, uas]}
          >
            <View style={styles.minus} />
            {children}
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  )
}


const _style = createStyleSheet(({ palette }) => ({
  clickAwayListener: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  content: {
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingTop: 5,
    shadowColor: palette.text,
    backgroundColor: palette.white,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  minus: {
    height: 3,
    width: 40,
    borderRadius: 3,
    alignSelf: 'center',
    backgroundColor: palette.disabled
  }
}));

export default memo(ModalSheet);