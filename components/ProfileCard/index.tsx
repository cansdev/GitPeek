import React from 'react';
import { Text, View, Image, StyleSheet, Platform, ImageSourcePropType } from 'react-native';

interface ProfileCardProps {
  username: string;
  avatarUrl: string;
  userFollowers: number;
  userFollowing: number;
  userBio: string;
  userRepos: number;
  color?: string; 
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  username,
  avatarUrl,
  userFollowers,
  userFollowing,
  userBio,
  userRepos,
  color,
}) => {
  return (
    <View style={[styles.container, { backgroundColor: color || '#495569' }]}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: avatarUrl }} style={styles.profileImage} />
      </View>
      <View style={styles.textLayout}>
        <Text style={[styles.username, { fontSize: 40 }]} numberOfLines={1}>
          {username}
        </Text>
        <Text style={[styles.userBio, { fontSize: 18 }]} numberOfLines={3}>
          {userBio}
        </Text>
        <Text style={[styles.userRepos, { fontSize: 30 }]} numberOfLines={1}>
          Repos: {userRepos}
        </Text>
        <Text style={[styles.userFollowers, { fontSize: 30 }]} numberOfLines={1}>
          Followers: {userFollowers}
        </Text>
        <Text style={[styles.userFollowing, { fontSize: 30 }]} numberOfLines={1}>
          Following: {userFollowing}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bda9a8',
    alignItems: 'center',
    width: '90%',
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
    width: '100%',
    height: 300,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  textLayout: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },

  username: {
    color: 'white',
    fontWeight: 'bold',
    paddingBottom: 5,
  },

  userFollowers: {
    color: 'white',
  },

  userFollowing: {
    color: 'white',
  },

  userBio: {
    color: 'white',
    fontWeight: 'bold',
    paddingBottom: 15,
  },

  userRepos: {
    color: 'white',
  },
});

export default ProfileCard;
