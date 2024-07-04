import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, ScrollView, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import axios from 'axios';
import UserCard from './UserCard';

const SearchBar = () => {
  const navigation = useNavigation(); 

  const handleUserPress = () => {
    navigation.navigate('UserProfile'); 
  };

  const [enterText, setEnterText] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timer;
    const fetchData = async () => {
      if (!enterText.trim()) {
        setUserData(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        timer = setTimeout(async () => {
          const response = await axios.get(`https://api.github.com/search/users?q=${enterText}`);
          setUserData(response.data.items);
        }, 1000);
      } catch (error) {
        console.error('Fetching github users error: ', error);
        if (error.response && error.response.status === 403) {
          setError('Rate limit exceeded. Please try again later.');
        } else {
          setError('Error fetching github users. Please check your network connection.');
        }
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => clearTimeout(timer);
  }, [enterText]);

  const handleEnterText = (text) => {
    setEnterText(text);
  };
  //debounce

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a profile.."
        value={enterText}
        onChangeText={handleEnterText}
        autoCapitalize="none"
      />
      {loading && <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        {userData &&
          userData.map((user) => (
            <TouchableOpacity key={user.id} onPress={handleUserPress}>
              <UserCard
                key={user.id}
                username={user.login}
                userAddress={user.html_url}
                avatarUrl={user.avatar_url}
              />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 25,
    height: 65,
    width: '100%',
    borderColor: '#d6d2c5',
    borderWidth: 2,
    paddingHorizontal: 10,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  errorText: {
    marginTop: 20,
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SearchBar;

