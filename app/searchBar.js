import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';



const SearchBar = () => {
  const [enterText, setEnterText] = useState('');
  
  const handleEnterText = (text) => {
      setEnterText(text);
  };

  return (
    <View style={styles.container}> 
    <TextInput
      style={styles.input}
      placeholder="Search for a profile.."
      value={enterText}
      onChangeText={handleEnterText}
    />
    <Text>{enterText}</Text> 
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 20,
  },

  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 25,
    height: 65,
    width: '100%', 
    borderColor: '#d6d2c5',
    borderWidth: 2,
    borderShadow: 2,
    paddingHorizontal: 10,
  },
});

export default SearchBar;