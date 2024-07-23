import { StyleSheet, Platform  } from "react-native";

const styles = StyleSheet.create({
    container: {
      borderRadius: 25,
      borderColor: '#bda9a8',
      flexDirection: 'row',
      alignItems: 'center',
      width: 400,
      height: 200,
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
      width: '50%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
  
    profileImage: {
      width: '100%',
      height: '100%',
      borderTopLeftRadius: 25,
      borderBottomLeftRadius: 25,
    },
  
    textLayout: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    username: {
      color: 'white',
      paddingBottom: 10,
      fontWeight: 'bold',
    },
  
    userAddress: {
      color: 'white',
    },
  
  });

export default styles;