import React from 'react';
import { Text, View, Image, StyleSheet, Platform, ImageSourcePropType } from 'react-native';
import styles from './styles';

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



export default ProfileCard;
