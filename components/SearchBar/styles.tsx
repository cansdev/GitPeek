import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      paddingHorizontal: 10,
    },
    animatedContainer: {
      flexDirection: 'column',
      marginTop: 20,
    },
    gradientWrapper: {
      width: '100%',
      paddingBottom: 5,
    },
    gradientBackground: {
      borderRadius: 20,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0.5, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 5,
      width: '100%',
      height: 65,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 20,
      borderColor: '#d6d2c5',
      borderWidth: 1,
      height: '100%',
      width: '100%',
      paddingHorizontal: 15,
      backgroundColor: 'transparent',
    },
    icon: {
      marginHorizontal: 10,
    },
    input: {
      fontSize: 18,
      height: '100%',
      flex: 1,
      paddingLeft: 10,
      color: '#333',
    },
    loadingIndicator: {
      marginTop: 20,
    },
    errorText: {
      marginTop: 20,
      color: 'red',
      fontSize: 16,
      textAlign: 'center',
    },
  });

export default styles;