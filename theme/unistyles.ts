import { UnistylesRegistry, UnistylesRuntime } from 'react-native-unistyles';
import breakpoints from './breakpoints';
import { darkTheme, lightTheme } from '.';

UnistylesRegistry
  .addBreakpoints(breakpoints)
  .addThemes({
    light: lightTheme,
    dark: darkTheme,
  })
  .addConfig({
    adaptiveThemes: true,
  });

UnistylesRuntime.setTheme('light');