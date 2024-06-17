import React, { Fragment, useCallback, useState } from "react";
import { View } from "react-native";
import Button from "../../../components/Buttons/Button";
import { Link, router } from "expo-router";
import px from "../../../utils/px";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { ScrollViewContainer, Text } from "../../../components/ui";
import AuthTitle from "../../../components/Auth/AuthTitle";
import TextInput from "../../../components/form/TextInput";
import MailIcon from '../../../assets/icons/mail_icon.svg';
import TextInputPassword from "../../../components/form/TextInputPassword";
import { Validation } from "../../../utils/validation";
import BuildVersion from "../../../components/BuildVersion";
import Checkbox from "../../../components/form/Checkbox";
import useNotificationsStore from "../../../store/useToastStore";


export default function RegisterScreen() {
  const { toast } = useNotificationsStore();
  const { styles, theme: { typography, palette } } = useStyles(style);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [accept, setAccept] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    email: false,
    password: false,
    password2: false,
    accept: false
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
    if (
      email.trim() === ''
      || password.trim() === ''
      || password2.trim() === ''
      || (password !== password2)
      || !accept
    ) {
      setError(prev => ({
        ...prev,
        email: email.trim() === '',
        password: password.trim() === '',
        password2: password.trim() === '' || password !== password2,
        accept: !accept
      }));
      return;
    }
    try {
      setLoading(true);
      toast({ message: 'Please check your inbox for email verification!' });
      router.push('/(auth)/login')
    } catch (err: any) {
      toast({ message: err.toString(), variant: 'error' })
    }
    finally { setLoading(false) }
  }, [error, email, password, accept])

  return (
    <Fragment>
      <ScrollViewContainer contentContainerStyle={styles.content}>
        <AuthTitle
          textDown={"WELCOME"}
        />
        <View style={styles.form}>
          <TextInput
            label={'Name'}
          />
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
              setError(err => ({ ...err, password: text.trim() === '' }))
            }}
          />
          <TextInputPassword
            label={'Password Bestätigung'}
            error={error.password2}
            onChangeText={text => {
              setPassword2(text);
              setError(err => ({ ...err, password2: text.trim() === '' }))
            }}
          />
          <Checkbox
            label={'Akzeptieren Sie die Nutzungsbedingungen'}
            error={error.accept}
            onChecked={value => {
              setAccept(value);
              setError(err => ({ ...err, accept: false }))
            }}
          />

          <Button
            onPress={onSubmit}
            loading={loading}
          >
            SIGN UP
          </Button>
          <View style={styles.footer}>
            <Link href={'/(auth)/login'}>
              <Text
                style={[
                  typography.body1_m,
                  { color: palette.grey.gray2 }
                ]}
              >
                Already have account? {' '}
              </Text>
              <Text style={typography.title3_m}>
                SIGN IN
              </Text>
            </Link>
          </View>
        </View>
        <BuildVersion
          style={{ position: 'relative' }}
        />
      </ScrollViewContainer>
    </Fragment >
  )

}

const style = createStyleSheet(({ palette, typography, space }) => ({
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
  password: {
    ...typography.title3_sb,
    color: palette.error
  },
  footer: {
    alignItems: 'center',
    marginTop: px(20),
  }
}));
