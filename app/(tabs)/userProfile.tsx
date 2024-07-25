import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import ProfileCard from '@/components/ProfileCard/index';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import RepoButton from '@/components/RepoButton/index';
import Constants from 'expo-constants';
import { useSession } from '@/context/AuthContext';

const token = process.env.EXPO_PUBLIC_API_KEY;

interface SearchParams {
  login: string;
  color?: string;
}

export default function Tab() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    id: '',
    login: '',
    followers: 0,
    following: 0,
    avatar_url: '',
    public_repos: 0,
    bio: ''
  });
  const { userId } = useSession();
  console.log("Currently on user: ",userId)
  const [color, setColor] = useState<string>('#495569');

  const user = useLocalSearchParams() as unknown as SearchParams;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.github.com/users/${user.login}`, {
          headers: {
            Authorization: `token ${token}`
          }
        });

        setUserData(response.data);
        if (typeof user.color === 'string') {
          setColor(user.color);
        } else {
          setColor('#495569');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user.login, user.color]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : userData ? (
          <>
            <ProfileCard
              key={userData.id}
              username={userData.login}
              userFollowers={userData.followers}
              userFollowing={userData.following}
              avatarUrl={userData.avatar_url}
              userBio={userData.bio}
              userRepos={userData.public_repos}
              color={color}
            />
            <View style={styles.repoButtonContainer}>
              <RepoButton user={user} color={color} />
            </View>
          </>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  repoButtonContainer: {
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
});
