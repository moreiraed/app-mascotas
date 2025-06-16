import { StyleSheet } from 'react-native';

const indexStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
      gap: 10,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#333',
    },
    image: {
      width: 250,
      height: 250,
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