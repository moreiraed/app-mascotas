import { StyleSheet } from 'react-native';

const indexStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 40,
      color: '#333',
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 40,
    },
    loginButton: {
      backgroundColor: "#FDB63B",
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 30,
      marginBottom: 15,
      width: '80%',
      alignItems: 'center',
    },
    loginText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    registerButton: {
      borderWidth: 2,
      borderColor: "#FDB63B",
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 30,
      width: '80%',
      alignItems: 'center',
    },
    registerText: {
      color: "#FDB63B",
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  export default indexStyles;