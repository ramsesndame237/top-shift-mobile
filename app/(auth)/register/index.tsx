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
import {t} from "../../../locale/i18n";
import {register} from "../../../hooks/Authentification";


export default function RegisterScreen() {
  const { toast } = useNotificationsStore();
  const { styles, theme: { typography, palette } } = useStyles(style);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [accept, setAccept] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    email: false,
    password: false,
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
      || !accept
    ) {
      setError(prev => ({
        ...prev,
        email: email.trim() === '',
        password: password.trim() === '',
        accept: !accept
      }));
      return;
    }
    try {
      setLoading(true);
      // toast({ message: 'Please check your inbox for email verification!' });
     await register({
       username:name,
       email:email,
       password:password
     }).then((response)=>{
       console.log("this is the response",response)
       router.push('/(auth)/login')
     }).catch((error)=>{
       console.log("this is the error",error)
     })
    } catch (err: any) {
      toast({ message: err.toString(), variant: 'error' })
    }
    finally { setLoading(false) }
  }, [error, email, password, accept])

  return (
    <Fragment>
      <ScrollViewContainer contentContainerStyle={styles.content}>
        <AuthTitle
          textDown={t('translate_key_welcome')}
        />
        <View style={styles.form}>
          <TextInput
            label={t('translate_key_name')}
            onChangeText={text=>{
              setName(text)
            }}
          />
          <TextInput
            error={error.email}
            label={t('translate_key_email')}
            inputMode={'email'}
            endIcon={MailIcon}
            onChangeText={validateEmail}
          />
          <TextInputPassword
            label={t('translate_key_password')}
            error={error.password}
            onChangeText={text => {
              setPassword(text);
              setError(err => ({ ...err, password: text.trim() === '' }))
            }}
          />
          <Checkbox
            label={t('translate_key_accepterd_condition')}
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
            {t('translate_key_account_create')}
          </Button>
          <View style={styles.footer}>
            <Link href={'/(auth)/login'}>
              <Text
                style={[
                  typography.body1_m,
                  { color: palette.grey.gray2 }
                ]}
              >
                {t('translate_key_already')}? {' '}
              </Text>
              <Text style={typography.title3_m}>
                {t('translate_key_connect')}
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
    width: '100%',
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
