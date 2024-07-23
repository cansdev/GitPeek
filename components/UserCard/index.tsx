import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Platform, LayoutChangeEvent } from 'react-native';

interface UserCardProps {
  username: string;
  userAddress: string;
  avatarUrl: string;
  index: number;
}

const UserCard: React.FC<UserCardProps> = ({ username, userAddress, avatarUrl, index }) => {
  const [usernameFontSize, setUsernameFontSize] = useState<number>(27);
  const [addressFontSize, setAddressFontSize] = useState<number>(20);

  const backgroundColors = ['#b47ec2', '#c95e57', '#65baa8', '#5acc6d', '#c9d46e'];

  const backgroundColor = backgroundColors[index % backgroundColors.length];

  const handleTextLayout = (text: string, setTextFontSize: React.Dispatch<React.SetStateAction<number>>) => (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    let fontSize = 30;

    const textString = String(text);

    while (fontSize > 12 && TextWidth(textString, fontSize) > width) {
      fontSize -= 1;
    }

    setTextFontSize(fontSize);
  };

  const TextWidth = (text: string, fontSize: number): number => {
    const width = text.length * (fontSize * 0.6);
    return width;
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: avatarUrl }} style={styles.profileImage} />
      </View>
      <View style={styles.textLayout}>
        <Text
          style={[styles.username, { fontSize: usernameFontSize }]}
          numberOfLines={2}
        >
          {username}
        </Text>
        <Text
          style={[styles.userAddress, { fontSize: addressFontSize }]}
          onLayout={handleTextLayout(userAddress, setAddressFontSize)}
          numberOfLines={1}
        >
          {userAddress}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    borderColor: '#bda9a8',
    flexDirection: 'row',
    alignItems: 'center',
    width: 400,
    height: 200,
    marginVertical: 15,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  profileContainer: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  profileImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },

  textLayout: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  username: {
    color: 'white',
    paddingBottom: 10,
    fontWeight: 'bold',
  },

  userAddress: {
    color: 'white',
  },

});

export default UserCard;