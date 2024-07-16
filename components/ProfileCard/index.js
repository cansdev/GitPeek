import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Platform } from 'react-native';

const ProfileCard = ({ username, avatarUrl, userFollowers, userFollowing }) => {

  const [followersFontSize, setFollowersFontSize] = useState();
  const [followingFontSize, setFollowingFontSize] = useState();

  const handleTextLayout = (text, setTextFontSize) => (event) => {
    const { width } = event.nativeEvent.layout;
    let fontSize = 30; 

    const textString = String(text);

    while (fontSize > 12 && TextWidth(textString, fontSize) > width) {
      fontSize -= 1;
    }
    
    setFollowersFontSize(fontSize);
    setFollowingFontSize(fontSize);
  };

  const TextWidth = (text, fontSize) => {

    const width = text.length * (fontSize * 0.6);
    return width;
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: avatarUrl }} style={styles.profileImage} />
      </View>
      <View style={styles.textLayout}>
        <Text
          style={[styles.username, { fontSize: 30 }]}
          numberOfLines={1}
        >
          {username}
        </Text>
        
        <Text 
          style={[styles.userFollowers, { fontSize: followersFontSize }]}
          onLayout={handleTextLayout(userFollowers, setFollowersFontSize)}
          numberOfLines={1}
        >
          Followers: {userFollowers}
        </Text>

        <Text
          style={[styles.userFollowing, { fontSize: followingFontSize }]}
          onLayout={handleTextLayout(userFollowing, setFollowingFontSize)}
          numberOfLines={1}
        >
          Following: {userFollowing}
        </Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#495569',
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
    width: 70,
    height: 70,
    borderRadius: 25,
  },

  textLayout: {
    flexDirection: 'column',
    flex: 1,
    paddingVertical: 15,
    justifyContent: 'flex-end',
  },

  username: {
    color: 'white',
    paddingBottom: 25,
    fontWeight: 'bold',
  },

  userFollowers: {
    color: 'white',
  },

  userFollowing: {
    color: 'white',
  },

  profileText: {
    color: 'white',
    fontSize: 10,
    paddingBottom: 5,
  },
});


export default ProfileCard;
