import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, Platform, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBookmarks } from '@/context/BookmarkContext';

interface RepoCardProps {
    repoName: string;
    repoDesc: string;
    repoStars?: number;
    repoId?: number;
    bookmarked?: boolean; 
  }

/*
interface Bookmark {
    id: number;
    name: string;
    stars?: number;
    description: string;
}
*/

const RepoCard: React.FC<RepoCardProps> = ({
  repoName,
  repoDesc,
  repoStars = 0,
  repoId = -1,
  bookmarked: initialBookmarked = false,
}) => {
  const [repoDescFontSize, setRepoDescFontSize] = useState<number>(16);
  const [repoNameFontSize, setRepoNameFontSize] = useState<number>(18);
  const [bookmarked, setBookmarked] = useState<boolean>(initialBookmarked);

  const {addBookmark, removeBookmark } = useBookmarks();

  const adjustFontSize = useCallback((text: string, containerWidth: number, setTextFontSize: React.Dispatch<React.SetStateAction<number>>) => {
    let fontSize = 16;

    while (fontSize > 10 && TextWidth(text, fontSize) > containerWidth) {
      fontSize -= 1;
    }

    setTextFontSize(fontSize);
  }, []);

  const TextWidth = (text: string, fontSize: number): number => {
    if (!text) return 0;
    return text.length * (fontSize * 0.6);
  };

  const handleTextLayout = (text: string, setTextFontSize: React.Dispatch<React.SetStateAction<number>>) => (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    adjustFontSize(text, width, setTextFontSize);
  };

  const toggleBookmark = async () => {
    if (bookmarked) {
      if (repoId !== undefined) {
        await removeBookmark(repoId);
      }
    } else {
      if (repoId !== undefined) {
        await addBookmark({ id: repoId, name: repoName, stars: repoStars, description: repoDesc });
      }
    }
    setBookmarked(!bookmarked);
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
            <Icon name={bookmarked ? 'bookmark' : 'bookmark-o'} size={25} color={bookmarked ? 'black' : 'black'} />
          </TouchableOpacity>
        </View>
        <Text style={styles.repoStars}>
          {repoStars !== undefined ? `Stars: ${repoStars}` : 'Stars: 0'}
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
    backgroundColor: '#495569',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 300,
    height: 150,
    padding: 10,
    marginVertical: 10,
    alignSelf: 'center',
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
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  repoName: {
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontWeight: 'bold',
    flexShrink: 1, 
  },
  repoStars: {
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,    fontSize: 14,
    marginBottom: 5,
  },
  repoDesc: {
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,    fontSize: 14,
  },
  bookmarkIcon: {
    padding: 5,
  },
});

export default RepoCard;
