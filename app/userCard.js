import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Platform } from 'react-native';

const UserCard = ({ username, userAddress, avatarUrl }) => {
  const [usernameFontSize, setUsernameFontSize] = useState(30);
  const [addressFontSize, setAddressFontSize] = useState(20);

  const handleTextLayout = (text, setTextFontSize) => (event) => {
    const { width } = event.nativeEvent.layout;
    let fontSize = 30; 

    while (fontSize > 12 && TextWidth(text, fontSize) > width) {
      fontSize -= 1;
    }

    setTextFontSize(fontSize);
  };

  const TextWidth = (text, fontSize) => {
    
    return text.length * (fontSize * 0.6); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: avatarUrl }} style={styles.profileImage} />
      </View>
      <View style={styles.textLayout}>
        <Text
          style={[styles.username, { fontSize: usernameFontSize }]}
          onLayout={handleTextLayout(username, setUsernameFontSize)}
          numberOfLines={1}
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
    backgroundColor: '#ced4de',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bda9a8',
    flexDirection: 'row',
    alignItems: 'baseline',
    width: '90%',
    padding: 10,
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
    marginRight: 35,
  },

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  textLayout: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-end',
  },

  username: {
    fontWeight: 'bold',
  },

  userAddress: {
    fontWeight: 'bold',
  },
});

export default UserCard;
