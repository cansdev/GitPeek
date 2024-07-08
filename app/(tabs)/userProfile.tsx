import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import RepoCard from '../RepoCard';
import { useLocalSearchParams } from 'expo-router';

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
        setLoading(true); // Set loading to true before fetching data
        const response = await axios.get(`https://api.github.com/users/${user.login}/repos`);
        setRepoData(response.data);
      } catch (error) {
        console.error('Error fetching repo data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching (whether success or failure)
      }
    };

    fetchRepoData();
  }, [user.login]);

  // Only render the ScrollView when repoData has been updated and loading is false
  return (
    <View style={styles.container}>
      {!loading && repoData.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {repoData.map((repo) => (
            <RepoCard 
              key={repo.id}
              repoName={repo.name}
              repoStars={repo.stargazers_count}
              repoDesc={repo.description}
            />
          ))}
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },

  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Tab;
