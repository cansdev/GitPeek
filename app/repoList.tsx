import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import RepoCard from './RepoCard';

interface Repo {
    id: number;
    name: String;
    description: String;
  }
  

const Tab = () => {
  const [repoData, setRepoData] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/your-github-username/repos`);
        setRepoData(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching repo data:', error);
        setLoading(false);
      }
    };

    fetchRepoData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          repoData.map((repo) => (
            <RepoCard {...repoData}
              key={repo.id}
              repoName={repo.name}
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
  },
});

export default Tab;
