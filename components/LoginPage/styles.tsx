import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      paddingBottom: 60,
      backgroundColor: '#f5f5f5',
    },
    header: {
      alignItems: 'center',
      marginBottom: 40,
    },
    logo: {
      width: 180,
      height: 180,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: '#d6d2c5',
      marginBottom: 20,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
    },
    input: {
      height: 50,
      borderColor: '#aaa',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 16,
      marginBottom: 15,
      backgroundColor: '#fff',
    },
    button: {
      backgroundColor: '#28a745',
      paddingVertical: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    footer: {
      marginTop: 20,
      alignItems: 'center',
    },
    footerText: {
      fontSize: 16,
      color: '#666',
    },
    link: {
      color: '#007bff',
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 5,
    },
  });

  export default styles;