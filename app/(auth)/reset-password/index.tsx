import React, { Fragment, useCallback, useState } from "react";
import { Image, View } from "react-native";
import Button from "../../../components/Buttons/Button";
import { Link, useRouter } from "expo-router";
import px from "../../../utils/px";
import { ScrollViewContainer, Text } from "../../../components/ui";
import TextInput from "../../../components/form/TextInput";
import MailIcon from '../../../assets/icons/mail_icon.svg';
import { Validation } from "../../../utils/validation";
import BuildVersion from "../../../components/BuildVersion";
import useNotificationsStore from "../../../store/useToastStore";
import { createStyleSheet, useStyles } from "react-native-unistyles";


export default function ResetPasswordPage() {
  const { styles, theme: { typography, palette } } = useStyles(style);
  const { toast } = useNotificationsStore();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    email: false,
  });

  const validateEmail = (text: string) => {
    if (Validation.email.test(email)) {
      if (error.email) setError({ ...error, email: false });
    } else {
      if (!error.email) setError({ ...error, email: true });
    }
    setEmail(text)
  };

  const onSubmit = useCallback(async () => {
    if (email.trim() === '') {
      setError({ email: email.trim() === '' });
      return;
    }
    try {
      setLoading(true)
      router.push({
        pathname: '/(auth)/reset-password/validate-code',
        params: { email }
      })
    } catch (error: any) {
      toast({ message: error.message, variant: 'error' })
    }
    finally { setLoading(false) }
  }, [error, email])

  return (
    <Fragment>
      <ScrollViewContainer>
        <Image
          style={styles.image}
          source={require('../../../assets/animate/mail_animated_icon.gif')}
        />
        <Text style={styles.body1}>
          Please, provide us the mail linked with your account
        </Text>
        <View style={styles.form}>
          <TextInput
            error={error.email}
            label={'Email Adresse'}
            inputMode={'email'}
            endIcon={MailIcon}
            onChangeText={validateEmail}
            style={styles.input}
            containerStyle={styles.input}
          />
        </View>

        <Button
          loading={loading}
          onPress={onSubmit}
        >
          Passwort zurücksetzen
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
    marginTop: px(20),
    marginBottom: px(100)
  },
  footer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: px(5),
    marginTop: px(20),
  },
  input: {
    backgroundColor: palette.background
  }
}));
