import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RepoCard from '@/components/RepoCard/index';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { useBookmarks } from '@/context/BookmarkContext';

interface Repo {
  id: number;
  name: string;
  stars?: number;
  description: string;
}

export default function Tab() {

  const { bookmarks, clearBookmarks } = useBookmarks();
  const [bookmarkedRepos, setBookmarkedRepos] = useState<Repo[]>([]);  

   useFocusEffect(
    useCallback(() => {
     setBookmarkedRepos(bookmarks);
     console.log('Bookmarks from context:', bookmarks);
    }, [bookmarks])
  );
  
  const renderItem = ({ item }: { item: Repo }) => (
    <RepoCard
      key={item.id}
      repoName={item.name}
      repoStars={item.stars}
      repoDesc={item.description}
      repoId={item.id}
      bookmarked={true}
    />
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={clearBookmarks}>
        <Text style={styles.buttonText}>Clear Bookmarks</Text>
      </TouchableOpacity>
      <FlatList
        data={bookmarkedRepos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text>No bookmarked repositories yet.</Text>}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  flatList: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007bff', 
    borderRadius: 5, 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    marginVertical: 20, 
    zIndex: 10,
  },
  buttonText: {
    color: 'white', 
    fontSize: 16,
    textAlign: 'center', 
  },
});