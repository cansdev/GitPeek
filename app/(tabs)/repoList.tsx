import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, FlatList} from 'react-native';
import axios from 'axios';
import RepoCard from '@/components/RepoCard/index';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBookmarks } from '@/context/BookmarkContext';
import Constants from 'expo-constants';


  /** Limited amount of repos available due to 
    --> Pagination Handling
    GitHub API apparently limits items for up to 30 per page  
    */
    
interface Repo {
    id: number;
    name: string;
    stargazers_count: number;
    description: string;
    bookmarked: number;
  }
  
const token = process.env.EXPO_PUBLIC_API_KEY;

const Tab = ({ }: any) => {
  const [repoData, setRepoData] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const { bookmarks } = useBookmarks();

  const user = useLocalSearchParams();

  useEffect(() => {
    const fetchRepoData = async () => {

      try {
        setLoading(true); 
       
        const response = await axios.get(`https://api.github.com/users/${user.login}/repos`, 
          {
              headers: {
                Authorization: `token ${token}`
              }
            }
        
        );

        setRepoData(response.data);
        setLoading(false);
        /* response.data.forEach(repo => {
            console.log('Repository Name:', repo.name);
            console.log('Repository Description:', repo.description);
          }); */ 
          
      } catch (error) {
        console.error('Error fetching repo data:', error);
        setLoading(false);
      }
    };
  
    //Http Headers
    //JWT Token
    //Axios parameters
    
    fetchRepoData();
    //console.log(`API key: ${token}`);
  }, [user.login]);

  const isBookmarked = (repoId: number) => bookmarks.some((bookmark) => bookmark.id === repoId);

  const renderItem = ({ item }: { item: Repo }) => (
    <RepoCard
      key={item.id}
      repoName={item.name}
      repoStars={item.stargazers_count}
      repoDesc={item.description}
      repoId={item.id}
      bookmarked={isBookmarked(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={repoData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },

  flatList: {
    flexGrow: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Tab;
