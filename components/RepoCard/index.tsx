import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, Platform, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useBookmarks } from '@/context/BookmarkContext';
import styles from './styles';

interface RepoCardProps {
    repoName: string;
    repoDesc: string;
    repoStars?: number;
    repoId?: number;
    bookmarked?: boolean; 
}

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

  const { addBookmark, removeBookmark } = useBookmarks();

  const adjustFontSize = useCallback((text: string, containerWidth: number, setTextFontSize: React.Dispatch<React.SetStateAction<number>>) => {
    let fontSize = 16;
    const minFontSize = 12;

    while (fontSize > minFontSize && TextWidth(text, fontSize) > containerWidth) {
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
            <Icon name={bookmarked ? 'bookmark' : 'bookmark-o'} size={30} color={bookmarked ? '#FFD700' : '#C0C0C0'} />
          </TouchableOpacity>
        </View>
        <Text style={styles.repoStars}>
          {repoStars !== undefined ? `⭐ ${repoStars}` : '⭐ 0'}
        </Text>
        <Text
          style={[styles.repoDesc, { fontSize: repoDescFontSize }]}
          onLayout={handleTextLayout(repoDesc, setRepoDescFontSize)}
          numberOfLines={4}
        >
          {repoDesc}
        </Text>
      </View>
    </View>
  );
};

export default RepoCard;
