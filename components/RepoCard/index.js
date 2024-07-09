import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RepoCard = ({ repoName, repoDesc, repoStars }) => {
  const [repoDescFontSize, setRepoDescFontSize] = useState(16);
  const [repoNameFontSize, setRepoNameFontSize] = useState(18);
  const [bookmarked, setBookmarked] = useState(false);

  const handleTextLayout = (text, setTextFontSize) => (event) => {
    const { width } = event.nativeEvent.layout;
    let fontSize = 18;

    while (fontSize > 12 && TextWidth(text, fontSize) > width) {
      fontSize -= 1;
    }

    setTextFontSize(fontSize);
  };

  const TextWidth = (text, fontSize) => {

    if(!text) 
        return 0;

    return text.length * (fontSize * 0.6);
  };

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

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
        <Text style={styles.repoStars}>Stars: {repoStars}</Text>
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