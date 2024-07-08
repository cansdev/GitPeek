import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import ProfileCard from './ProfileCard';
import { Key, useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import RepoButton from './RepoButton';

export default function Tab({ }: any) {

  const [userData, setUserData] = useState({
    id: '',
    login: '',
    followers: '',
    following: '',
    avatar_url: ''
  });
  const user = useLocalSearchParams();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${user.login}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      {userData.id ? (
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
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
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
