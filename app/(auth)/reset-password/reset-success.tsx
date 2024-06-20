import React, { Fragment } from "react";
import { Image } from "react-native";
import Button from "../../../components/Buttons/Button";
import px, { height } from "../../../utils/px";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { ScrollViewContainer, Text } from "../../../components/ui";
import AuthTitle from "../../../components/Auth/AuthTitle";
import BuildVersion from "../../../components/BuildVersion";
import { useRouter } from "expo-router";


export default function ResetSuccessScreen() {
  const { styles } = useStyles(style);
  const router = useRouter();

  const onSubmit = () => {
    router.replace('/(auth)/login')
  }

  return (
    <Fragment>
      <ScrollViewContainer>
        <AuthTitle
          textUp={"Erfolgreich"}
          textDown={"registriert"}
        />
        <Text style={styles.title}>
          Sie haben Ihr Passwort erfolgreich zurückgesetzt.
          <Text style={styles.subTitle}> Sie können sich jetzt anmelden 😃</Text>
        </Text>

        <Image
          source={require('../../../assets/animate/check_animation.gif')}
          style={styles.image}
        />
        <Button
          onPress={onSubmit}
        >
          LogIn
        </Button>
      </ScrollViewContainer>
      <BuildVersion />
    </Fragment>
  )

}

const style = createStyleSheet(({ palette, typography }) => ({
  title: {
    ...typography.title3_m,
    color: palette.black,
    textAlign: 'center',
    marginTop: px(35)
  },
  subTitle: {
    ...typography.title3_m,
    color: palette.primary,
  },
  image: {
    width: px(184),
    height: px(184),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: px(50)
  }
}));
