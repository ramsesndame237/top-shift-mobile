import React, { FC, memo, useCallback } from 'react';
import { BackHandler, NativeSyntheticEvent, TextInput, TextInputSubmitEditingEventData } from 'react-native';
import px from '../../utils/px';
import IconButton from '../Buttons/IconButton';
import BackIcon from '../../assets/icons/back_icon.svg';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Animated, { FadeInLeft, FadeOut } from 'react-native-reanimated';
import useNotificationStore from '../../store/useNotificationStore';
import { useFocusEffect } from 'expo-router';
import useProductStore from "../../store/product.store";

export type SearchType =
  | 'reviews'
  | 'settings'
  | 'products'
  | 'favorites'
  | 'notifications';

type SearchHeaderProps = {
  searchType?: SearchType;
  placeholder?: string;
  onPress?: () => void;
};

const SearchHeader: FC<SearchHeaderProps> = memo((props) => {
  const { searchType, placeholder, onPress } = props;
  const { styles, theme: { palette } } = useStyles(style);

  const { product,setProduct } = useProductStore();
  const { notifications, setNotifications } = useNotificationStore();

  const onSearch = useCallback(({ nativeEvent: { text } }: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    const search = text.trim().toLowerCase();
    if (search === "") return;
    if (searchType === 'products') {
      setProduct(
          product.filter(product => product.title.toLowerCase().includes(search))
      )
    }
    // else if (searchType === 'reviews') {
    //   setReviews(
    //     reviews.filter(review => review.text?.toLowerCase().includes(search))
    //   )
    // }
    // else if (searchType === 'favorites') {
    //   setFavorites(
    //     favorites.filter(favorite => favorite.title.toLowerCase().includes(search))
    //   )
    // }
    else if (searchType === 'notifications') {
      setNotifications(
        notifications.filter(notification => notification.title.toLowerCase().includes(search))
      )
    }
  }, []);


  useFocusEffect(() => {
    const unsubscrible = BackHandler.addEventListener('hardwareBackPress', () => {
      onPress?.();
      return true;
    })
    return () => unsubscrible.remove();
  })


  return (
    <Animated.View
      style={[styles.container]}
      entering={FadeInLeft}
      exiting={FadeOut.duration(300)}
    >
      <IconButton
        Icon={BackIcon}
        onPress={onPress}
      />
      <TextInput
        autoFocus
        style={styles.input}
        autoCorrect={false}
        onSubmitEditing={onSearch}
        onChange={onSearch}
        selectionColor={palette.text}
        underlineColorAndroid={'transparent'}
        placeholder={placeholder ?? 'Type to search'}
      />
    </Animated.View>
  )
});

export default SearchHeader;


const style = createStyleSheet(({ typography, space }) => ({
  container: {
    paddingTop: space.statusbar,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: space.container,
  },
  input: {
    flex: 1,
    ...typography.body1_m,
    paddingLeft: px(5),
    height: px(40),
    borderRadius: px(5),
  }
}));