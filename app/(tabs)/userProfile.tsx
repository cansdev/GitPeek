import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import ProfileCard from '../ProfileCard';
import RepoButton from '../RepoButton';
import { useLocalSearchParams } from 'expo-router';

export default function Tab({ }: any) {
  const [userData, setUserData] = useState({
    id: '',
    login: '',
    followers: '',
    following: '',
    avatar_url: ''
  });
  const [loading, setLoading] = useState(true); 

  const user = useLocalSearchParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true); 
        const response = await axios.get(`https://api.github.com/users/${user.login}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUserData();
  }, [user.login]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <ProfileCard
            key={userData.id}
            username={userData.login}
            userFollowers={userData.followers}
            userFollowing={userData.following}
            avatarUrl={userData.avatar_url}
          />
          <RepoButton user={user}/>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
});
