import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Platform } from 'react-native';

const UserCard = ({ username, userAddress, avatarUrl, index }) => {
  const [usernameFontSize, setUsernameFontSize] = useState(27);
  const [addressFontSize, setAddressFontSize] = useState(20);

  const backgroundColors = ['#b47ec2', '#c95e57', '#65baa8', '#5acc6d', '#c9d46e'];

  const backgroundColor = backgroundColors[index % backgroundColors.length];

  const handleTextLayout = (text, setTextFontSize) => (event) => {
    const { width } = event.nativeEvent.layout;
    let fontSize = 30;

    const textString = String(text);

    while (fontSize > 12 && TextWidth(textString, fontSize) > width) {
      fontSize -= 1;
    }

    setTextFontSize(fontSize);
  };

  const TextWidth = (text, fontSize) => {
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
