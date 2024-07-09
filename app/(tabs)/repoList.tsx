import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import RepoCard from '@/components/RepoCard/index';
import { useLocalSearchParams } from 'expo-router';


  /** Limited amount of repos available due to 
    --> Pagination Handling
    GitHub API apparently limits items for up to 30 per page  
    */

  const token = process.env.EXPO_PUBLIC_API_KEY; 

    
interface Repo {
    id: number;
    name: string;
    stargazers_count: number;
    description: string;
  }

const Tab = ({ }: any) => {
  const [repoData, setRepoData] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  const user = useLocalSearchParams();

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        setLoading(true); 
        const response = await axios.get(`https://api.github.com/users/${user.login}/repos`);
        headers: {
          Authorization: `token ${token}`
        }

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
    //
    //
    fetchRepoData();
  }, [user.login]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          repoData.map((repo) => (
            <RepoCard 
              key={repo.id}
              repoName={repo.name}
              repoStars={repo.stargazers_count}
              repoDesc={repo.description}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },

  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Tab;
