import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Animated } from 'react-native';
import axios from 'axios';
import UserCard from '../UserCard';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient from expo-linear-gradient

const token = process.env.EXPO_PUBLIC_API_KEY;

const SearchBar = () => {
  const [enterText, setEnterText] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animation] = useState(new Animated.Value(25));
  const [selectedColor, setSelectedColor] = useState(null);

  const handleUserPress = (user, color) => {
    console.log(user.login);
    setSelectedColor(color);
    router.navigate({
      pathname: './userProfile',
      params: {
        login: user.login,
        color: color
      }
    });
  };

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
          const response = await axios.get(`https://api.github.com/search/users?q=${enterText}`,
            {
              headers: {
                Authorization: `token ${token}`
              }
            }
          );
          setUserData(response.data.items);
        }, 500);
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

  const handleFocus = () => {
    Animated.timing(animation, {
      toValue: 10,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    Animated.timing(animation, {
      toValue: 25,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const marginLeft = animation.interpolate({
    inputRange: [5, 25],
    outputRange: [5, 25],
  });

  const marginRight = animation.interpolate({
    inputRange: [5, 25],
    outputRange: [5, 25],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedContainer, { marginLeft, marginRight }]}>
        <View style={styles.gradientWrapper}>
          <LinearGradient
            colors={['#f9f9f9', '#ffffff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <View style={styles.inputContainer}>
              <Icon name="search" size={24} color="#333" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Search for a profile.."
                placeholderTextColor="#888"
                value={enterText}
                onChangeText={handleEnterText}
                onFocus={handleFocus}
                onBlur={handleBlur}
                autoCapitalize="none"
              />
            </View>
          </LinearGradient>
        </View>
      </Animated.View>
      {loading && <ActivityIndicator style={styles.loadingIndicator} size="large" color="#007bff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {userData &&
        userData.map((user, index) => {
          const backgroundColors = ['#b47ec2', '#c95e57', '#65baa8', '#5acc6d', '#c9d46e'];
          const backgroundColor = backgroundColors[index % backgroundColors.length];
          return (
            <TouchableOpacity key={user.id} onPress={() => handleUserPress(user, backgroundColor)}>
              <UserCard
                username={user.login}
                userAddress={user.html_url}
                avatarUrl={user.avatar_url}
                index={index}
              />
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 10, // Ensure there's horizontal padding
  },
  animatedContainer: {
    flexDirection: 'column',
    marginTop: 20,
  },
  gradientWrapper: {
    width: '100%',
    paddingBottom: 5, // Add padding to the bottom to ensure the gradient is not cut off
  },
  gradientBackground: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    // Ensure gradient background expands fully to its container's width
    width: '100%',
    height: 65, // Adjust height to match input height or desired size
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#d6d2c5',
    borderWidth: 1,
    height: '100%',
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: 'transparent', // make background transparent for gradient effect
  },
  icon: {
    marginHorizontal: 10,
  },
  input: {
    fontSize: 18,
    height: '100%',
    flex: 1,
    paddingLeft: 10,
    color: '#333',
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
