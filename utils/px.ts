import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get('window');

export default function px(px: number | `${number}`) {
  return Number(px) / PixelRatio.getFontScale();
}

export {
  width,
  height
}