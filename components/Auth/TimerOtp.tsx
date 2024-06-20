import React, { memo, useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Text } from '../ui'
import px from '../../utils/px'
import Animated, { Layout } from 'react-native-reanimated'

type Props = {
  value?: number;
  onPress?: () => void;
  onComplete?: () => void;
}

const AnimatedView = Animated.createAnimatedComponent(View);

const TimerOtp = memo<Props>((props) => {

  const { styles, theme: { palette, typography } } = useStyles(style);
  const [time, setTime] = useState(props.value ?? 30);

  useEffect(() => {
    const subs = setInterval(() => setTime(t => t > 1 ? t - 1 : 0), 1000);
    return () => clearInterval(subs);
  }, []);

  useEffect(() => {
    if (time === 0) {
      props.onComplete?.();
    }
  }, [time])

  return (
    <AnimatedView
      style={[
        styles.container,
        { justifyContent: time === 0 ? 'center' : 'space-between' }
      ]}
    >
      {time !== 0 ?
        <Text style={{ color: palette.grey.gray1 }}>
          Ablauf Code in: <Text style={styles.time}>{String(time).padStart(2, '0')}s</Text>
        </Text> :
        null
      }
      <AnimatedView
        layout={
          Layout
            .duration(400)
            .springify()
        }
      >
        <TouchableOpacity
          activeOpacity={.8}
          onPress={() => {
            props.onPress?.();
            setTime(30);
          }}
        >
          <Text style={typography.body1_sb}>Neuen Password</Text>
        </TouchableOpacity>
      </AnimatedView>
    </AnimatedView>
  )
})


const style = createStyleSheet(({ typography, palette }) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  time: {
    ...typography.title3_sb,
    color: palette.black,
    width: px(10)
  }

}))

export default TimerOtp