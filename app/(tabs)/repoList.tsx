import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';
import RepoCard from '@/components/RepoCard/index';
import { useLocalSearchParams } from 'expo-router';
import { useBookmarks } from '@/context/BookmarkContext';
import { useSession } from '@/context/AuthContext';

interface Repo {
  id: string;
  name: string;
  stargazers_count: number;
  description: string;
}

const token = process.env.EXPO_PUBLIC_API_KEY;

const Tab = () => {
  const [repoData, setRepoData] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const { addBookmark, bookmarks } = useBookmarks();
  const { userId } = useSession();
  const user = useLocalSearchParams();

  console.log("Currently on user: ", userId);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.github.com/users/${user.login}/repos`, {
          headers: {
            Authorization: `token ${token}`,
          },
        });
        setRepoData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching repo data:', error);
        setLoading(false);
      }
    };

    if (userId != '' && userId) { // Ensure userId is defined before using it
      fetchRepoData();
    }
  }, [user.login]);

  const isBookmarked = (repoId: string) => bookmarks.some((bookmark) => bookmark.repository_id === repoId);

  const handleBookmark = async (repo: Repo) => {
    try {
      if (!userId) {
        throw new Error('userId is undefined');
      }
      await addBookmark({
        userId: userId,
        repository_id: repo.id,
        name: repo.name,
        stars: repo.stargazers_count,
        description: repo.description,
      });
    } catch (error) {
      console.error('Error adding bookmark:', error);
    }
  };

  const renderItem = ({ item }: { item: Repo }) => (
    <RepoCard
      repoName={item.name}
      repoStars={item.stargazers_count}
      repoDesc={item.description}
      repoId={item.id}
      bookmarked={isBookmarked(item.id)}
      onPressBookmark={() => handleBookmark(item)} 
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
    justifyContent: 'flex-start',
  },
  flatList: {
    flexGrow: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Tab;
