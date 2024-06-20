import React, { Fragment, useCallback, useState } from "react";
import { Image, View } from "react-native";
import Button from "../../../components/Buttons/Button";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import px, { height } from "../../../utils/px";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { ScrollViewContainer, Text } from "../../../components/ui";
import BuildVersion from "../../../components/BuildVersion";
import OtpInput from "../../../components/form/OtpInput";
import TimerOtp from "../../../components/Auth/TimerOtp";
import useNotificationsStore from "../../../store/useToastStore";


export default function ValidateCodeScreen() {
  const { styles, theme: { typography, palette } } = useStyles(style);
  const { toast } = useNotificationsStore();
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    if (code.length !== 5) {
      setError(true);
      return;
    }
    try {
      setLoading(true);
      router.replace({
        pathname: `/(auth)/reset-password/new-password`,
        params: {
          code,
          email
        }
      })
    } catch (err: any) {
      toast({ message: 'Something went wrong!', variant: 'error' });
    }
    finally { setLoading(false) }
  }, [code]);

  return (
    <Fragment>
      <ScrollViewContainer>
        <Image
          style={styles.image}
          source={require('../../../assets/animate/shield_animation.gif')}
        />
        <Text style={styles.body1}>
          Geben Sie den 5-stelligen Code ein, den Sie per E-Mail an contact@beispiel.com erhalten haben.
        </Text>
        <View style={styles.form}>
          <OtpInput
            error={error}
            onChange={(code) => {
              setCode(code);
              setError(code.length !== 5)
            }}
          />
          <TimerOtp />
        </View>

        <Button
          loading={loading}
          onPress={onSubmit}
        >
          Bestätigen
        </Button>
        <View style={styles.footer}>
          <Text style={typography.body1_sb}>
            Zurück zum
          </Text>
          <Link href={'/(auth)/register'}>
            <Text
              style={[
                typography.title3_sb,
                { color: palette.primary }
              ]}
            >
              Register
            </Text>
          </Link>
        </View>
      </ScrollViewContainer>
      <BuildVersion />
    </Fragment>
  )

}

const style = createStyleSheet(({ palette, typography }) => ({
  image: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: px(100),
    width: px(110),
    height: px(110),
  },
  body1: {
    ...typography.body1_m,
    marginTop: px(15),
    textAlign: 'center',
    color: palette.black
  },
  form: {
    rowGap: px(20),
    marginTop: px(20),
    marginBottom: px(100)
  },
  footer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: px(5),
    marginTop: px(20),
  }
}));
