import React, {Fragment, useCallback, useState} from "react";
import {View} from "react-native";
import Button from "../../../components/Buttons/Button";
import {Link, useRouter} from "expo-router";
import px from "../../../utils/px";
import {createStyleSheet, useStyles} from "react-native-unistyles";
import {ScrollViewContainer, Text} from "../../../components/ui";
import AuthTitle from "../../../components/Auth/AuthTitle";
import TextInput from "../../../components/form/TextInput";
import MailIcon from '../../../assets/icons/mail_icon.svg';
import TextInputPassword from "../../../components/form/TextInputPassword";
import {Validation} from "../../../utils/validation";
import BuildVersion from "../../../components/BuildVersion";
import useNotificationsStore from "../../../store/useToastStore";
import {t} from "../../../locale/i18n";
import {login} from "../../../hooks/Authentification";


export default function LoginScreen() {
    const {styles, theme: {typography}} = useStyles(style);
    const {toast} = useNotificationsStore();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState({
        username: false,
        password: false
    });

    // const validateEmail = (text: string) => {
    //     if (Validation.email.test(email)) {
    //         if (error.email) setError({...error, email: false});
    //     } else {
    //         if (!error.email) setError({...error, email: true});
    //     }
    //     setEmail(text)
    // };

    const onSubmit = useCallback(async () => {
        if (username.trim() === '' || password.trim() === '') {
            setError({
                username: username.trim() === '',
                password: password.trim() === '',
            });
            return;
        }
        try {
            setLoading(true);
            await login({username,password,expiresInMins:160}).then((response) => {

                console.log("this is the response",response)
                // router.replace('/(tabs)/');

            }).catch((error)=>{

                toast({ message: error.message, variant: 'error' });
            })
        } catch (err: any) {
            toast({message: err.toString(), variant: 'error'})
        } finally {
            setLoading(false)
        }
    }, [error, email, password])

    return (
        <Fragment>
            <ScrollViewContainer contentContainerStyle={styles.content}>
                <AuthTitle
                    textUp={"TOPS SHOP"}
                    textDown={t('translate_key_welcome')}
                />
                <View style={styles.form}>
                    {/*<TextInput*/}
                    {/*    error={error.email}*/}
                    {/*    label={t('translate_key_email')}*/}
                    {/*    inputMode={'email'}*/}
                    {/*    endIcon={MailIcon}*/}
                    {/*    onChangeText={validateEmail}*/}
                    {/*/>*/}
                    <TextInput
                        label={t('translate_key_name')}
                        onChangeText={text=>{
                            setUsername(text)
                        }}
                    />
                    <TextInputPassword
                        label={t('translate_key_password')}
                        error={error.password}
                        onChangeText={text => {
                            setPassword(text);
                            setError({...error, password: text.trim() === ''})
                        }}
                    />

                    <View style={{alignItems: 'center'}}>
                        <Link href={'/reset-password/'}>
                            <Text style={typography.title3_m}>
                                {t('translate_key_foget_password')}
                            </Text>
                        </Link>
                    </View>

                    <Button
                        loading={loading}
                        onPress={onSubmit}
                    >
                        {t('translate_key_connect')}
                    </Button>
                    <View style={styles.footer}>
                        <Link href={'/(auth)/register'}>
                            <Text style={typography.title3}>
                                {t('translate_key_account_create')}
                            </Text>
                        </Link>
                    </View>
                </View>

            </ScrollViewContainer>
            <BuildVersion/>
        </Fragment>
    )

}

const style = createStyleSheet(({palette, space}) => ({
    content: {
        paddingHorizontal: 0
    },
    form: {
        width: '100%',
        rowGap: px(20),
        paddingLeft: px(15),
        paddingRight: px(15),
        marginVertical: px(20),
        // paddingHorizontal: space.container,
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
