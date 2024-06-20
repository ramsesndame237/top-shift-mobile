import React, { memo, useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import Loading from '../../assets/icons/loading.svg';
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { Text, ViewContainer } from '../ui';
import AuthTitle from '../Auth/AuthTitle';
import px from '../../utils/px';



const LaodingTab = () => {
  const { styles, theme: { typography } } = useStyles(style);
  const degre = useSharedValue(0);

  const uas = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${degre.value}deg` }
    ]
  }));

  useEffect(() => {
    degre.value = withRepeat(withTiming(360, { duration: 2000 }), -1);
  }, [])

  return (
    <ViewContainer
      style={styles.container}
    >
      <AuthTitle
        textUp={'Wir suchen kompatible'}
        textDown={'Geräte'}
        style={typography.title2_eb}
      />
      <Text style={styles.text}>
        Bitte warten
      </Text>
      <Animated.View
        style={[styles.loadingContainer, uas]}
      >
        <Loading />
      </Animated.View>
    </ViewContainer>
  )
}

export default memo(LaodingTab)

const style = createStyleSheet(({ palette, typography }) => ({
  container:{
    flex:0,
    width:'100%',
  },
  text: {
    ...typography.title3_sb,
    color: palette.grey.gray1,
    marginTop: px(100),
    marginBottom: px(20),
    fontSize: px(20),
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  }
}))

