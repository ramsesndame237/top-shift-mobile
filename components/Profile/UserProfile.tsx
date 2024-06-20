import React, { FC, memo } from 'react';
import { Image, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import px from '../../utils/px';
import { Text } from '../ui';

type UserProfileProps = {
  src?: any;
  username?: string;
  email?: string;
}



const UserProfile: FC<UserProfileProps> = memo(({ src, username, email }) => {
  const { styles, theme: { typography } } = useStyles(style);
  return (
    <View style={styles.container}>
      <Image
        source={src}
        style={styles.image}
      />
      <View>
        <Text style={typography.subtitle_b}>{username}</Text>
        <Text style={styles.label}>{email}</Text>
      </View>
    </View>
  );
});


export default UserProfile;

const style = createStyleSheet(({ typography, palette, space }) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: px(20),
    columnGap: px(20),
    marginHorizontal: space.container
  },
  image: {
    width: px(70),
    height: px(70),
    borderRadius: px(70),
    borderWidth: px(1),
    borderColor: palette.info,
  },
  label:{
    ...typography.body1,
    color: palette.grey.gray2,
  }
}));