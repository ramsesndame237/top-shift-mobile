import px from "../utils/px";

type Typography = {
  fontSize?: number;
  lineHeight?: number;
  fontFamily?: keyof typeof fonts;
}

const fonts = {
  SF800: require('../assets/fonts/SFUIDisplay-Black.ttf'),
  SF700: require('../assets/fonts/SFUIDisplay-Bold.ttf'),
  SF600: require('../assets/fonts/SFUIDisplay-Semibold.ttf'),
  SF500: require('../assets/fonts/SFUIDisplay-Medium.ttf'),
  SF400: require('../assets/fonts/SFUIDisplay-Regular.ttf'),
  SF300: require('../assets/fonts/SFUIDisplay-Light.ttf'),
}

const typography = {
  title1_eb: {
    fontSize: px(40),
    fontFamily: 'SF800',
    lineHeight: px(40)
  },
  title1_b: {
    fontSize: px(40),
    fontFamily: 'SF700',
    lineHeight: px(40)
  },
  title1_sb: {
    fontSize: px(40),
    fontFamily: 'SF600',
    lineHeight: px(40)
  },
  title1_m: {
    fontSize: px(40),
    fontFamily: 'SF500',
    lineHeight: px(40)
  },
  title1: {
    fontSize: px(40),
    fontFamily: 'SF400',
    lineHeight: px(40)
  },
  title2_eb: {
    fontSize: px(30),
    fontFamily: 'SF800'
  },
  title2_b: {
    fontSize: px(30),
    fontFamily: 'SF700'
  },
  title2_sb: {
    fontSize: px(30),
    fontFamily: 'SF600'
  },
  title2_m: {
    fontSize: px(30),
    fontFamily: 'SF500'
  },
  title2: {
    fontSize: px(30),
    fontFamily: 'SF400'
  },
  subtitle_eb: {
    fontSize: px(24),
    fontFamily: 'SF800'
  },
  subtitle_b: {
    fontSize: px(24),
    fontFamily: 'SF700'
  },
  subtitle_sb: {
    fontSize: px(24),
    fontFamily: 'SF600'
  },
  subtitle_m: {
    fontSize: px(24),
    fontFamily: 'SF500'
  },
  subtitle: {
    fontSize: px(24),
    fontFamily: 'SF400'
  },
  title3_eb: {
    fontSize: px(18),
    fontFamily: 'SF800'
  },
  title3_b: {
    fontSize: px(18),
    fontFamily: 'SF700'
  },
  title3_sb: {
    fontSize: px(18),
    fontFamily: 'SF600'
  },
  title3_m: {
    fontSize: px(18),
    fontFamily: 'SF600'
  },
  title3: {
    fontSize: px(18),
    fontFamily: 'SF400'
  },
  body1_eb: {
    fontSize: px(16),
    fontFamily: 'SF800'
  },
  body1_b: {
    fontSize: px(16),
    fontFamily: 'SF700'
  },
  body1_sb: {
    fontSize: px(16),
    fontFamily: 'SF600'
  },
  body1_m: {
    fontSize: px(16),
    fontFamily: 'SF500'
  },
  body1: {
    fontSize: px(16),
    fontFamily: 'SF400'
  },
  body2_eb: {
    fontSize: px(14),
    fontFamily: 'SF800'
  },
  body2_b: {
    fontSize: px(14),
    fontFamily: 'SF700'
  },
  body2_sb: {
    fontSize: px(14),
    fontFamily: 'SF600'
  },
  body2_m: {
    fontSize: px(14),
    fontFamily: 'SF500'
  },
  body2: {
    fontSize: px(14),
    fontFamily: 'SF400'
  },
  caption_eb: {
    fontSize: px(12),
    fontFamily: 'SF800'
  },
  caption_b: {
    fontSize: px(12),
    fontFamily: 'SF700'
  },
  caption_sb: {
    fontSize: px(12),
    fontFamily: 'SF600'
  },
  caption_m: {
    fontSize: px(12),
    fontFamily: 'SF500'
  },
  caption: {
    fontSize: px(12),
    fontFamily: 'SF400'
  },
  button_eb: {
    fontSize: px(18),
    fontFamily: 'SF800'
  },
  button_b: {
    fontSize: px(18),
    fontFamily: 'SF700'
  },
  button_sb: {
    fontSize: px(18),
    fontFamily: 'SF600'
  },
  button_m: {
    fontSize: px(18),
    fontFamily: 'SF500'
  },
  button: {
    fontSize: px(18),
    fontFamily: 'SF400'
  },
} as const;

export { fonts };
export default typography as Record<keyof typeof typography, Typography>;
