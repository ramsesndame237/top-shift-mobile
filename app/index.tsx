import React, { FC } from 'react'
import { Image, View } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import px, { height, width } from '../utils/px'
import { Text, ViewContainer } from '../components/ui'
import Button from '../components/Buttons/Button'
import { router } from 'expo-router'


const Onboarding: FC = () => {
    const { styles } = useStyles(style);

    return (
        <ViewContainer>
            <Image
                style={styles.background}
                resizeMode={'cover'}
                source={require('../assets/images/onboarding.jpeg')}
            />
            <View style={styles.container}>
                <Text style={styles.title1}>
                    MAKE YOUR
                </Text>
                <Text style={styles.title2}>
                    HOME BEAUTIFUL
                </Text>
                <Text style={styles.text}>
                    The best simple place where you discover most wonderful furnitures and make your home beautiful
                </Text>
                <Button
                    style={styles.button}
                    onPress={() => router.replace('/(tabs)')}
                >
                    Get Started
                </Button>
            </View>
        </ViewContainer>
    )
}

const style = createStyleSheet(({ palette, typography }) => ({
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height: px(height * 1.05),
    },
    container: {
        flex: 1,
        paddingTop: px(150),
    },
    title1: {
        ...typography.title2_b,
        color: palette.grey.gray1,
    },
    title2: {
        ...typography.title2_b,
    },
    text: {
        marginTop: px(50),
        ...typography.title3,
        color: palette.grey.grey1_60,
        lineHeight: 35,
    },
    button: {
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingHorizontal: px(50),
        marginTop: px(200)
    }
}))

export default Onboarding