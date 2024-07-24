import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
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
    const [bookmarked, setBookmarked] = useState<boolean>(initialBookmarked);
    const { addBookmark, removeBookmark } = useBookmarks();

    const toggleBookmark = async () => {
        try {
            if (bookmarked) {
                await removeBookmark(repoId || 0);
            } else {
                await addBookmark({ id: repoId || 0, name: repoName, stars: repoStars, description: repoDesc });
            }
            setBookmarked(!bookmarked);
        } catch (error) {
            console.error('Error toggling bookmark:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.contents}>
                <View style={styles.header}>
                    <Text style={styles.repoName}>{repoName}</Text>
                    <TouchableOpacity onPress={toggleBookmark} style={styles.bookmarkIcon}>
                        <Icon name={bookmarked ? 'bookmark' : 'bookmark-o'} size={30} color={bookmarked ? '#FFD700' : '#C0C0C0'} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.repoDesc}>{repoDesc}</Text>
                <Text style={styles.repoStars}>Stars: {repoStars}</Text>
            </View>
        </View>
    );
};

export default RepoCard;
