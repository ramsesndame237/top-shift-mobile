import React, { Fragment, useCallback, useState } from "react";
import { View } from "react-native";
import Button from "../../../components/Buttons/Button";
import { Link, useRouter } from "expo-router";
import px from "../../../utils/px";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { ScrollViewContainer, Text } from "../../../components/ui";
import AuthTitle from "../../../components/Auth/AuthTitle";
import TextInput from "../../../components/form/TextInput";
import MailIcon from '../../../assets/icons/mail_icon.svg';
import TextInputPassword from "../../../components/form/TextInputPassword";
import { Validation } from "../../../utils/validation";
import BuildVersion from "../../../components/BuildVersion";
import useNotificationsStore from "../../../store/useToastStore";


export default function LoginScreen() {
  const { styles, theme: { typography } } = useStyles(style);
  const { toast } = useNotificationsStore();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    email: false,
    password: false
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
    if (email.trim() === '' || password.trim() === '') {
      setError({
        email: email.trim() === '',
        password: password.trim() === '',
      });
      return;
    }
    try {
      setLoading(true);
      router.replace('/(tabs)/');
    } catch (err: any) {
      toast({ message: err.toString(), variant: 'error' })
    }
    finally { setLoading(false) }
  }, [error, email, password])

  return (
    <Fragment>
      <ScrollViewContainer contentContainerStyle={styles.content}>
        <AuthTitle
          textUp={"Hell!"}
          textDown={"WELCOME BACK"}
        />
        <View style={styles.form}>
          <TextInput
            error={error.email}
            label={'Email Adresse'}
            inputMode={'email'}
            endIcon={MailIcon}
            onChangeText={validateEmail}
          />
          <TextInputPassword
            label={'Password'}
            error={error.password}
            onChangeText={text => {
              setPassword(text);
              setError({ ...error, password: text.trim() === '' })
            }}
          />

          <View style={{ alignItems: 'center' }}>
            <Link href={'/reset-password/'} >
              <Text style={typography.title3_m}>
                Passwort vergessen?
              </Text>
            </Link>
          </View>

          <Button
            loading={loading}
            onPress={onSubmit}
          >
            Log in
          </Button>
          <View style={styles.footer}>
            <Link href={'/(auth)/register'}>
              <Text style={typography.title3}>
                SIGN UP
              </Text>
            </Link>
          </View>
        </View>

      </ScrollViewContainer>
      <BuildVersion />
    </Fragment>
  )

}

const style = createStyleSheet(({ palette, space }) => ({
  content: {
    paddingHorizontal: 0
  },
  form: {
    width: '95%',
    rowGap: px(20),
    marginVertical: px(20),
    paddingHorizontal: space.container,
    paddingVertical: px(20),
    elevation: 4,
    backgroundColor: palette.white,
    shadowColor: palette.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  footer: {
    alignItems: 'center',
    marginTop: px(20),
  },
}));
