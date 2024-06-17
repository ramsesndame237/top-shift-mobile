import React, { memo } from "react";
import { StyleProp, TextStyle, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import AuthIcon from '../../assets/icons/auth_header_icon.svg';
import { Text } from "../ui";
import px from "../../utils/px";

type Props = {
  textUp?: string;
  textDown?: string;
  style?: StyleProp<TextStyle>
}

const AuthTitle = memo<Props>(({ textUp, textDown, style: textStyle }) => {
  const { styles, theme: { typography, palette } } = useStyles(style);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.divider} />
        <AuthIcon />
        <View style={styles.divider} />
      </View>
      <Text
        style={[
          typography.title2_b,
          { color: palette.grey.gray2 },
          textStyle
        ]}
      >
        {textUp}
      </Text>
      <Text
        style={[
          typography.title2_b,
          { color: palette.primary },
          textStyle
        ]}
      >
        {textDown}
      </Text>
    </View>
  )
});

const style = createStyleSheet(({ palette, space }) => ({
  container: {
    paddingTop: px(50),
    paddingHorizontal: space.container,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: px(10),
  },
  divider: {
    flex: 1,
    height: px(1),
    backgroundColor: palette.divider,
  }
}))

export default AuthTitle;