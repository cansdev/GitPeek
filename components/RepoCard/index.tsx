import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useBookmarks } from '@/context/BookmarkContext';
import styles from './styles';

export interface RepoCardProps {
  repoName: string;
  repoDesc: string;
  repoStars?: number;
  repoId: string;
  bookmarked?: boolean;
  onPressBookmark?: () => void;
}

const RepoCard: React.FC<RepoCardProps> = ({
  repoName,
  repoDesc,
  repoStars = 0,
  repoId, 
  bookmarked: initialBookmarked = false,
  onPressBookmark,
}) => {
  console.log(`RepoCard props:`, { repoName, repoDesc, repoStars, repoId, initialBookmarked });

  const bookmarked = initialBookmarked;

  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <View style={styles.header}>
          <Text style={styles.repoName}>{repoName}</Text>
          <TouchableOpacity onPress={onPressBookmark} style={styles.bookmarkIcon}>
            <Icon
              name={bookmarked ? 'bookmark' : 'bookmark-o'}
              size={30}
              color={bookmarked ? '#FFD700' : '#C0C0C0'}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.repoDesc}>{repoDesc}</Text>
        <Text style={styles.repoStars}>Stars: {repoStars}</Text>
      </View>
    </View>
  );
};


export default RepoCard;
