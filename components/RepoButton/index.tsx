import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

interface RepoButtonProps {
  user: {
    login: string;
  };
  color?: string; 
}

const RepoButton: React.FC<RepoButtonProps> = ({ user, color }) => {

  const handleRepoPress = () => {
    console.log(user.login + ' repositories');
    router.navigate({
      pathname: './repoList',
      params: {
        login: user.login
      }
    });
  };

  return (
    <TouchableOpacity 
      style={styles.repoButton}
      onPress={handleRepoPress}
    >
      <View style={[styles.container, { backgroundColor: color || '#495569' }]}>
        <Text style={styles.repoButtonText}>Repositories</Text>
        <Icon name="chevron-right" size={30} color="white" />
      </View> 
    </TouchableOpacity>
  );
};

export default RepoButton;
