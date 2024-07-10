import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RepoCard from '@/components/RepoCard/index';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

interface Repo {
  id: number;
  name: string;
  stargazers_count: number;
  description: string;
}

export default function Tab() {

   useFocusEffect(
    useCallback(() => {

      console.log('Focusing on profile tab');

      const fetchBookmarks = async () => {

        try {
          const bookmarks = await AsyncStorage.getItem('bookmarks');
          if (bookmarks) {
            setBookmarkedRepos(JSON.parse(bookmarks));
          }
          else {
            setBookmarkedRepos([])
          }
  
        }
        catch(error) {
          console.error('Error fetching bookmarks: ', error);
        }
      };

      fetchBookmarks();
      
      return () => {
        console.log('Leaving profile tab');
      }
    }, [])
  );

  const clearBookmarks = async () => {
    try {
      await AsyncStorage.removeItem('bookmarks');
      setBookmarkedRepos([]);
    } catch (error) {
      console.error('Error clearing bookmarks: ', error);
    }
  };
  

  const [bookmarkedRepos, setBookmarkedRepos] =  useState<Repo[]>([]);
  
  return (
    <View style={styles.container}>
    <Button title="Clear Bookmarks" onPress={clearBookmarks} /> 
      <ScrollView contentContainerStyle={styles.scrollView}>
        {bookmarkedRepos.length === 0 ? (<Text> No bookmarked repositories yet.</Text>) 
        : (
          bookmarkedRepos.map((repo) => (
            <RepoCard 
              key={repo.id}
              repoName={repo.name}
              repoStars={null}
              repoDesc={repo.description}
              repoId={repo.id}
              bookmarked={null}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
