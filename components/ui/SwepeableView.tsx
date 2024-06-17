import React, { FC, PropsWithChildren, memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { SharedValue, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


type SwepeableViewProps = PropsWithChildren & {
  triggerX?: number;
  triggerColor?: string;
  onAction?: () => void;
  renderAction: (dragX: SharedValue<number>) => React.ReactNode;
};

const LEFT_WIDTH = 0;
const TRIGGER_WIDTH = -1000;

const SwepeableView: FC<SwepeableViewProps> = memo((props: SwepeableViewProps) => {
  const { triggerX, triggerColor, renderAction, onAction, children } = props;
  const translateX = useSharedValue(0);
  const active = useSharedValue(false);
  const offset = useSharedValue(0);

  const gesture = useMemo(() => Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate((e) => {
      if (e.translationX < LEFT_WIDTH) {
        const transX = offset.value + e.translationX;
        translateX.value = transX;
        if (transX <= (triggerX ?? -TRIGGER_WIDTH)) {
          active.value = true;
        } else {
          active.value = false;
        }
      }
    })
    .onEnd(() => (offset.value = translateX.value))
    .onFinalize(() => {
      if (active.value) {
        offset.value = withTiming(TRIGGER_WIDTH);
        translateX.value = withTiming(TRIGGER_WIDTH);
        if (onAction) runOnJS(onAction)();
      } else {
        offset.value = withTiming(0);
        translateX.value = withTiming(0);
      }
    }), [triggerX]);

  const uas = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }), []);

  const uasAction = useAnimatedStyle(() => ({
    backgroundColor: active.value ? (triggerColor ?? 'transparent') : 'transparent'
  }), []);

  return (
    <GestureDetector gesture={gesture}>
      <View style={style.container}>
        <Animated.View
          style={[uas]}
        >
          {children}
        </Animated.View>
        <Animated.View style={[style.content, uasAction]}>
          {renderAction(translateX)}
        </Animated.View>
      </View>
    </GestureDetector>
  );
});

const style = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  content: {
    position: 'absolute',
    width: '100%',
    zIndex: -1,
    top: 0,
    bottom: 0,
    left: 0
  }
})

export default SwepeableView;