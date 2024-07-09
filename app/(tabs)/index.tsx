import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '@/components/SearchBar/index'

export default function Tab() {

  return (
    <View style={styles.container}>
      <SearchBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },

  userCardsLayout: {
    paddingVertical: 80,
    marginLeft: 20,
    width: '100%',
  },
});
