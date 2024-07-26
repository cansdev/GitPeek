import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import RepoCard from '@/components/RepoCard/index';
import { useBookmarks, Bookmark } from '@/context/BookmarkContext';
import { useSession } from '@/context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

const Profile: React.FC = () => {
  const { bookmarks, clearBookmarks, removeBookmark, fetchBookmarks } = useBookmarks(); 
  const { userId } = useSession();
  const [loading, setLoading] = useState(true);

  const fetchBookmarksCallback = useCallback(async () => {
    setLoading(true);
    try {
      await fetchBookmarks(); 
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchBookmarks]);

  useFocusEffect(
    React.useCallback(() => {
      fetchBookmarksCallback();
    }, [fetchBookmarksCallback])
  );

  const renderItem = ({ item }: { item: Bookmark }) => {
    console.log("Rendering item: ", item.repositoryId)
    return (
      <RepoCard
        key={item.repositoryId} 
        repoName={item.name}
        repoStars={item.stars || 0}
        repoDesc={item.description}
        repoId={item.repositoryId}
        bookmarked={true}
        onPressBookmark={() => removeBookmark(item.repositoryId)}
      />
    );
  };

  const keyExtractor = (item: Bookmark) => item.repositoryId; 

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
          keyExtractor={keyExtractor}
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
