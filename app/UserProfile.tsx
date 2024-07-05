import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import ProfileCard from './ProfileCard';
import { Key, useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

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
    const data = axios.get(`https://api.github.com/users/${user.login}`)
    .then((response) => {
        setUserData(response.data);
    })
  }, [])

  return (
    <View style={styles.container}>
      {userData.id ? <ProfileCard
        key={userData.id}
        username={userData.login}
        userFollowers={userData.followers}
        userFollowing={userData.following}
        avatarUrl={userData.avatar_url}
      /> : <ActivityIndicator />}
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
