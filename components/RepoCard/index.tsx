import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RepoCardProps {
    repoName: string;
    repoDesc: string;
    repoStars?: number;
    repoId?: number;
    bookmarked?: boolean; 
}

interface Bookmark {
    id: number;
    name: string;
    stars?: number;
    description: string;
}

const RepoCard: React.FC<RepoCardProps> = ({
  repoName,
  repoDesc,
  repoStars = 0,
  repoId = -1,
  bookmarked: initialBookmarked = false
}) => {
  const [repoDescFontSize, setRepoDescFontSize] = useState<number>(16);
  const [repoNameFontSize, setRepoNameFontSize] = useState<number>(18);
  const [bookmarked, setBookmarked] = useState<boolean>(initialBookmarked);

  const handleTextLayout = (text: string, setTextFontSize: React.Dispatch<React.SetStateAction<number>>) => (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    let fontSize = 18;

    while (fontSize > 12 && TextWidth(text, fontSize) > width) {
      fontSize -= 1;
    }

    setTextFontSize(fontSize);
  };

  const TextWidth = (text: string, fontSize: number): number => {
    if (!text) return 0;
    return text.length * (fontSize * 0.6);
  };

  const toggleBookmark = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem('bookmarks');
      let bookmarksArray: Bookmark[] = bookmarks ? JSON.parse(bookmarks) : [];

      if (bookmarked) {
        bookmarksArray = bookmarksArray.filter((item) => item.id !== repoId);
        await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarksArray));
      } else {
        bookmarksArray.push({ id: repoId, name: repoName, stars: repoStars, description: repoDesc });
        await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarksArray));
      }
      setBookmarked(!bookmarked);
    } catch (error) {
      console.error('Error toggling bookmark: ', error);
    }
  };

  useEffect(() => {
    setBookmarked(initialBookmarked);
  }, [initialBookmarked]);

  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <View style={styles.header}>
          <Text
            style={[styles.repoName, { fontSize: repoNameFontSize }]}
            onLayout={handleTextLayout(repoName, setRepoNameFontSize)}
            numberOfLines={1}
          >
            {repoName}
          </Text>
          <TouchableOpacity onPress={toggleBookmark} style={styles.bookmarkIcon}>
            <Icon name={bookmarked ? 'bookmark' : 'bookmark-o'} size={25} color={bookmarked ? 'blue' : 'black'} />
          </TouchableOpacity>
        </View>
        <Text style={styles.repoStars}>
          {repoStars !== undefined ? `Stars: ${repoStars}` : null}
        </Text>
        <Text
          style={[styles.repoDesc, { fontSize: repoDescFontSize }]}
          onLayout={handleTextLayout(repoDesc, setRepoDescFontSize)}
          numberOfLines={5}
        >
          {repoDesc}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '90%',
    padding: 10,
    marginVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  contents: {
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  repoName: {
    fontWeight: 'bold',
    flexShrink: 1, 
  },
  repoStars: {
    fontSize: 14,
    marginBottom: 5,
  },
  repoDesc: {
    fontSize: 14,
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
  },
});

export default RepoCard;
