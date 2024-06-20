import hexToRGBA from "../utils/hexToRGBA";

const GREY = {
  gray1: '#45535C',
  gray2: '#98A8B2',
  gray3: '#D5E1EA',
  gray4: '#EDEDED',
  gray5: '#999999',
  grey1_10: hexToRGBA('#45535C', .1),
  grey1_20: hexToRGBA('#45535C', .2),
  grey1_30: hexToRGBA('#45535C', .3),
  grey1_40: hexToRGBA('#45535C', .4),
  grey1_50: hexToRGBA('#45535C', .5),
  grey1_60: hexToRGBA('#45535C', .6),
  grey1_70: hexToRGBA('#45535C', .7),
  grey1_80: hexToRGBA('#45535C', .8),
  grey1_90: hexToRGBA('#45535C', .9),
  grey2_10: hexToRGBA('#98A8B2', .1),
  grey2_20: hexToRGBA('#98A8B2', .2),
  grey2_30: hexToRGBA('#98A8B2', .3),
  grey2_40: hexToRGBA('#98A8B2', .4),
  grey2_50: hexToRGBA('#98A8B2', .5),
  grey2_60: hexToRGBA('#98A8B2', .6),
  grey2_70: hexToRGBA('#98A8B2', .7),
  grey2_80: hexToRGBA('#98A8B2', .8),
  grey2_90: hexToRGBA('#98A8B2', .9),
  grey3_10: hexToRGBA('#D5E1EA', .1),
  grey3_20: hexToRGBA('#D5E1EA', .2),
  grey3_30: hexToRGBA('#D5E1EA', .3),
  grey3_40: hexToRGBA('#D5E1EA', .4),
  grey3_50: hexToRGBA('#D5E1EA', .5),
  grey3_60: hexToRGBA('#D5E1EA', .6),
  grey3_70: hexToRGBA('#D5E1EA', .7),
  grey3_80: hexToRGBA('#D5E1EA', .8),
  grey3_90: hexToRGBA('#D5E1EA', .9),
};

const COMMON = {
  primary: '#05422C',
  primary_light: '#EFFFEC',
  secondary: '#17AF26',
  success: "#27AE60",
  info: "#219EBC",
  error: "#FF2E3A",
  error_light: '#FFECEC',
  divider: GREY.grey1_20,
  disabled: GREY.grey1_10,
  grey: GREY,
  gray: '#CED9E1'
};

export const palette = {
  light: {
    ...COMMON,
    mode: 'light',
    text: '#242424',
    background: '#F5F5F5',
    grey: GREY,
    stroke_default: '#DBDBDB',
    title: '#303030',
    white: '#FFF',
    black: '#020B12',
  },
  dark: {
    ...COMMON,
    mode: 'dark',
    text: '#F0F0F0',
    background: '#242424',
    grey: GREY,
    stroke_default: '#DBDBDB',
    title: '#F0F0F0',
    white: '#000',
    black: '#FFF',
  }
};

export default palette;
