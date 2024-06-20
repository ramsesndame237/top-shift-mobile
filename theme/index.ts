import breakpoints from "./breakpoints";
import palette from "./palette";
import typography from "./typography";
import space from "./space";
import hexToRGBA from "../utils/hexToRGBA";
import { Theme } from "@react-navigation/native";

const common = {
  typography,
  space,
  utils: {
    hexToRGBA
  }
}

export const lightTheme = {
  palette: palette.light,
  ...common
}

export const darkTheme = {
  palette: palette.dark,
  ...common
}

const navigationTheme: Record<string, Theme> = {
  light: {
    dark: false,
    colors: {
      primary: lightTheme.palette.primary,
      background: lightTheme.palette.background,
      text: lightTheme.palette.text,
      card: lightTheme.palette.background,
      border: lightTheme.palette.divider,
      notification: lightTheme.palette.error,
    },
  },
  dark: {
    dark: true,
    colors: {
      primary: darkTheme.palette.primary,
      background: darkTheme.palette.background,
      text: darkTheme.palette.text,
      card: darkTheme.palette.background,
      border: darkTheme.palette.divider,
      notification: darkTheme.palette.error,
    },
  },
} as const;


export { navigationTheme };

export type AppBreakpoints = typeof breakpoints;
export type AppTheme = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints { }
  export interface UnistylesThemes extends AppTheme { }
}