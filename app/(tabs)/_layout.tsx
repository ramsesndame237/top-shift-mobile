import React from "react";
import { Tabs } from "expo-router";
import px from "../../utils/px";
import HomeIcon from '../../assets/icons/home_icon.svg';
import FavoriteIcon from '../../assets/icons/favorite_icon.svg';
import ProfileIcon from '../../assets/icons/profile_icon.svg';
import NotificationIcon from '../../assets/icons/notification_icon.svg';
import { createStyleSheet, useStyles } from "react-native-unistyles";


export default function TabsLayout() {
    const { styles, theme: { palette } } = useStyles(style);

    return (
        <Tabs
            screenOptions={({ route }) => {
                return {
                    tabBarHideOnKeyboard: true,
                    tabBarStyle: styles.tabBarStyle,
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarBadge: route.name === 'notification/index' ? '' : undefined,
                    tabBarBadgeStyle: styles.badgeStyle,
                    tabBarIcon: ({ focused }) => {
                        let Svg = HomeIcon;
                        if (route.name === 'favorite/index') Svg = FavoriteIcon;
                        if (route.name === 'notification/index') Svg = NotificationIcon;
                        if (route.name === 'profile/index') Svg = ProfileIcon;
                        return (
                            <Svg
                                fill={focused ? palette.primary : 'transparent'}
                                stroke={focused ? 'transparent' : palette.primary}
                            />
                        )
                    }
                }
            }}
        >
            <Tabs.Screen
                name={'index'}
            />
            <Tabs.Screen
                name={'favorite/index'}
            />
            <Tabs.Screen
                name={'notification/index'}
            />
            <Tabs.Screen
                name={'profile/index'}
            />
        </Tabs>
    )
}


const style = createStyleSheet(({ palette }) => ({
    tabBarStyle: {
        height: px(70),
        backgroundColor: palette.white,
        elevation: 0
    },
    badgeStyle: {
        marginTop: px(15),
        transform: [{ scale: 0.6 }]
    },
}));