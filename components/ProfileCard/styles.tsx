import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
    container: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#bda9a8',
      alignItems: 'center',
      width: '90%',
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
      width: '100%',
      height: 300,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    profileImage: {
      width: '100%',
      height: '100%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
  
    textLayout: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      paddingVertical: 10,
    },
  
    username: {
      color: 'white',
      fontWeight: 'bold',
      paddingBottom: 5,
    },
  
    userFollowers: {
      color: 'white',
    },
  
    userFollowing: {
      color: 'white',
    },
  
    userBio: {
      color: 'white',
      fontWeight: 'bold',
      paddingBottom: 15,
    },
  
    userRepos: {
      color: 'white',
    },
  });

  export default styles;