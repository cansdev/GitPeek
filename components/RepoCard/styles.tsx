import { StyleSheet, Platform} from "react-native";

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#495569',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      width: 350,
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
      textShadowRadius: 3,
      fontSize: 14,
      marginBottom: 5,
    },
    repoDesc: {
      color: 'white',
      textShadowColor: 'rgba(0, 0, 0, 0.5)', 
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
      fontSize: 14,
    },
    bookmarkIcon: {
      padding: 5,
    },
  });

export default styles;