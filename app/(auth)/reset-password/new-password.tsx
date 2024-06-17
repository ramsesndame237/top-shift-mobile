import React, { Fragment, useCallback, useState } from "react";
import { View } from "react-native";
import Button from "../../../components/Buttons/Button";
import px, { height } from "../../../utils/px";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { ScrollViewContainer } from "../../../components/ui";
import AuthTitle from "../../../components/Auth/AuthTitle";
import TextInputPassword from "../../../components/form/TextInputPassword";
import BuildVersion from "../../../components/BuildVersion";
import { useLocalSearchParams, useRouter } from "expo-router";
import useNotificationsStore from "../../../store/useToastStore";


export default function LoginScreen() {
  const { styles } = useStyles(style);
  const { toast } = useNotificationsStore();
  const router = useRouter();
  const { code, email } = useLocalSearchParams();
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    password: false,
    password2: false,
  });

  const onSubmit = useCallback(async () => {
    if (password.trim() === '' || password.trim() === '' || password !== password2) {
      setError({
        password: password.trim() === '',
        password2: password2.trim() === '',
      });
      return;
    }
    try {
      setLoading(true);
    } catch (err: any) {
      toast({ message: err.message, variant: 'error' })
    }
    finally { setLoading(false) }
  }, [error, password, password2]);

  return (
    <Fragment>
      <ScrollViewContainer>
        <AuthTitle
          textUp={"Lege bitte ein"}
          textDown={"Passwort fest"}
        />
        <View style={styles.form}>
          <TextInputPassword
            label={'Password'}
            error={error.password}
            placeholder={'**************'}
            onChangeText={text => {
              setPassword(text);
              setError(err => ({ ...err, password: text.trim() === '' }))
            }}
          />
          <TextInputPassword
            label={'Password Bestätigung'}
            error={error.password2}
            placeholder={'**************'}
            onChangeText={text => {
              setPassword2(text);
              setError(err => ({ ...err, password2: text.trim() === '' || text !== password }))
            }}
          />
        </View>

        <Button
          loading={loading}
          onPress={onSubmit}
        >
          Bestätigen
        </Button>
      </ScrollViewContainer>
      <BuildVersion />
    </Fragment>
  )

}

const style = createStyleSheet(({ palette, typography }) => ({
  form: {
    marginTop: px(100),
    rowGap: px(20),
    margintop: px(20),
    marginBottom: px(50)
  },
  password: {
    ...typography.title3_sb,
    color: palette.error
  }
}));
