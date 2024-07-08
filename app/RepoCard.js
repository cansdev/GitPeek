import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, Platform } from 'react-native';

const RepoCard = ({repoName, repoDesc, repoStars }) => {
  const [repoDescFontSize, setRepoDescFontSize] = useState(30);
  const [repoNameFontSize, setRepoNameFontSize] = useState(20);

  const handleTextLayout = (text, setTextFontSize) => (event) => {
    const { width } = event.nativeEvent.layout;
    let fontSize = 30; 

    const textString = String(text);

    while (fontSize > 12 && TextWidth(textString, fontSize) > width) {
      fontSize -= 1;
    }

    setTextFontSize(fontSize);
  };

  const TextWidth = (text, fontSize) => {

    const width = text.length * (fontSize * 0.6);
    return width;
  };

  return (
    <View style={styles.container}>
        <View style={styles.contents} >
        <Text
          style={[styles.repoName, { fontSize: repoNameFontSize }]}
          onLayout={handleTextLayout(repoName, setRepoNameFontSize)}
          numberOfLines={5}
        >
        {repoName}
        </Text>

        <Text 
        style={[styles.repoStars]}
        numberOfLines={1}
        >
        Stars: {repoStars}
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
    backgroundColor: '#ced4de',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bda9a8',
    flexDirection: 'row',
    alignItems: 'baseline',
    width: '90%',
    padding: 10,
    marginVertical: 15,
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

  profileContainer: {
    marginRight: 35,
  },

  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 25,
  },

  repoName: {
    paddingBottom: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  repoStars: {    
    fontSize: 15,
  },

  repoDesc: {
    paddingBottom: 5,
    textAlign: 'center',
  },
});

export default RepoCard;
