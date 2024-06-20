import React, {FC} from 'react'
import {Image, View} from 'react-native'
import {createStyleSheet, useStyles} from 'react-native-unistyles'
import px, {height, width} from '../utils/px'
import {Text, ViewContainer} from '../components/ui'
import Button from '../components/Buttons/Button'
import {router} from 'expo-router'
import {t} from "../locale/i18n";


const Onboarding: FC = () => {
    const {styles} = useStyles(style);

    return (
        <ViewContainer>
            <View style={styles.container_image}>
                <Image
                    style={styles.logo}
                    resizeMode={'contain'}
                    source={require('../assets/images/logo.png')}
                />
            </View>
            <Image
                style={styles.background}
                resizeMode={'cover'}
                source={require('../assets/images/bg_images.png')}
            />
            <View style={styles.container}>
                <Text style={styles.title1}>
                    {t('translate_key_best_hero_description')}
                </Text>
                <Text style={styles.title2}>
                    {t('translate_key_type_produit')}
                </Text>

                <Button
                    style={styles.button}
                    onPress={() => router.replace('/(tabs)')}
                >
                    {t('translate_key_shop_all_title')}
                </Button>
            </View>
        </ViewContainer>
    )
}

const style = createStyleSheet(({palette, typography}) => ({
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height: px(height * 1.05),
    },
    logo: {
        height: px(80),
        width: px(80),

    },
    container: {
        flex: 1,
        paddingTop: px(150),
    },
    container_image:{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor:'white',
        zIndex: 10,
         left: 0, right: 0,top:20
    },
    title1: {
        ...typography.title2_b,
        color: palette.white,
    },
    title2: {
        ...typography.title3,
        color: palette.white
    },
    text: {
        marginTop: px(50),
        ...typography.title3,
        color: palette.grey.grey1_20,
        lineHeight: 35,
    },
    button: {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingHorizontal: px(50),
        color: palette.secondary,
        marginTop: px(280)
    }
}))

export default Onboarding