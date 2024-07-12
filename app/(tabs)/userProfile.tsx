import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import ProfileCard from '@/components/ProfileCard/index';
import { Key, useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import RepoButton from '@/components/RepoButton/index';

const token = process.env.EXPO_PUBLIC_API_KEY; 

export default function Tab({ }: any) {
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState({
    id: '',
    login: '',
    followers: 0,
    following: 0,
    avatar_url: ''
  });
  const user = useLocalSearchParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.github.com/users/${user.login}` 
          //headers: {
            //Authorization: `token ${token}`
          //}
        );
        
        //bad practice
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user.login]);

  return (
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
          />
          <RepoButton user={user}/>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
});