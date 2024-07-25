import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import RepoCard from '@/components/RepoCard/index';
import { useBookmarks, Bookmark } from '@/context/BookmarkContext';
import { useSession } from '@/context/AuthContext';

const Profile: React.FC = () => {
  const { bookmarks, clearBookmarks, removeBookmark } = useBookmarks();
  const { userId } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchBookmarks = async () => {
      try {
        if (!userId) return;
        const response = await fetch(`http://localhost:8080/bookmarks/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch bookmarks');
        }
        const data = await response.json();
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, [userId]);

  const renderItem = ({ item }: { item: Bookmark }) => (
    <RepoCard
      key={item.id} 
      repoName={item.name}
      repoStars={item.stars || 0}
      repoDesc={item.description}
      repoId={item.repository_id}
      bookmarked={true}
      onPressBookmark={() => removeBookmark(item.repository_id)} 
    />
  );

  // Function to extract a string key from Bookmark
  const keyExtractor = (item: Bookmark, index: number) => {
    if (item.id) {
      return item.id.toString(); // Convert id to string if it's defined
    }
    return index.toString(); // Fallback to index.toString() if id is undefined
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={clearBookmarks}>
        <Text style={styles.buttonText}>Clear Bookmarks</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={bookmarks}
          renderItem={renderItem}
          keyExtractor={keyExtractor} // Use keyExtractor to return item.id as string
          ListEmptyComponent={<Text>No bookmarked repositories yet.</Text>}
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

export default Profile;
