import React, { FC, Fragment, memo, useCallback, useState } from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { Text } from '../ui';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import IconButton from '../Buttons/IconButton';
import BackIcon from "../../assets/icons/back_icon.svg";
import { router } from 'expo-router';
import SearchIcon from '../../assets/icons/search_icon.svg';
import SearchHeader, { SearchType } from './SearchHeader';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import useProductStore from '../../store/useProductStore';
import useNotificationStore from '../../store/useNotificationStore';


type HeaderProps = {
  title?: string;
  subtitle?: string;
  LeftContent?: React.FC;
  RightContent?: React.FC;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  backButton?: boolean;
  searchButton?: boolean;
  searchPlaceholder?: string;
  searchType?: SearchType;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
};


const Header: FC<HeaderProps> = memo((props) => {
  const { backButton, searchButton, LeftContent, RightContent, titleStyle, subtitleStyle } = props;
  const { styles } = useStyles(style);
  const [openSearch, setOpenSearch] = useState(false);

  const { products, reviews,favorites, setProducts, setReviews, setFavorites } = useProductStore();
  const { notifications, setNotifications } = useNotificationStore();

  const [store] = useState({
    products,
    reviews,
    favorites,
    notifications,
  });

  const searchIsRightDirection = searchButton && backButton;
  const backButtonIsLeftDirection = searchButton && !backButton;

  const onSearchOpen = useCallback(() => setOpenSearch(true), []);
  const onSearchClose = useCallback(() => {
    setOpenSearch(false);
    setProducts(store.products);
    setReviews(store.reviews);
    setFavorites(store.favorites);
    setNotifications(store.notifications);
  }, []);

  return (
    <Fragment>
      {!openSearch ?
        <Animated.View
          style={[styles.container, props.style]}
          entering={FadeInUp}
          exiting={FadeOutUp}
        >
          <View style={styles.view1}>
            {backButton ?
              <IconButton
                Icon={BackIcon}
                onPress={router.back}
              /> :
              backButtonIsLeftDirection ?
                <IconButton
                  Icon={SearchIcon}
                  onPress={onSearchOpen}
                /> :
                LeftContent ?
                  <IconButton
                    Icon={LeftContent}
                    onPress={props.onPressRight}
                  /> :
                  null
            }
          </View>
          <View style={styles.view2}>
            {props.subtitle ?
              <Text style={[styles.subtitle, subtitleStyle]}>{props.subtitle}</Text> :
              null
            }
            {props.title ?
              <Text style={[styles.title, titleStyle]}>{props.title}</Text> :
              null
            }
          </View>
          <View style={styles.view3}>
            {RightContent ?
              <IconButton
                Icon={RightContent}
                onPress={props.onPressRight}
              /> :
              searchIsRightDirection ?
                <IconButton
                  Icon={SearchIcon}
                  onPress={onSearchOpen}
                /> :
                null
            }
          </View>
        </Animated.View> :
        <SearchHeader
          searchType={props.searchType}
          placeholder={props.searchPlaceholder}
          onPress={onSearchClose}
        />
      }
    </Fragment>
  )
});


const style = createStyleSheet(({ palette, typography, space }) => ({
  container: {
    paddingTop: space.statusbar,
    marginHorizontal: space.container,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  view1: {
    flex: .4,
    alignItems: 'flex-start'
  },
  view2: {
    flex: 1,
    alignItems: 'center',
  },
  view3: {
    flex: .4,
    alignItems: 'flex-end',
  },
  subtitle: {
    ...typography.subtitle,
    color: palette.grey.gray1,
    textAlign: 'center'
  },
  title: {
    ...typography.subtitle_sb,
    textAlign: 'center',
    lineHeight: 28
  }
}));


export default Header;