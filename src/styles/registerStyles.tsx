import { StyleSheet } from 'react-native';

const registerStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginTop: 10,
      marginBottom: 30,
    },
    subtitle: {
      fontSize: 14,
      color: '#666',
      marginBottom: 30,
      textAlign: 'left',
    },
    label: {
      fontSize: 16,
      color: '#333',
      marginBottom: 6,
    },
    input: {
      backgroundColor: '#eee',
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      marginBottom: 16,
    },
    passwordContainer: {
      position: 'relative',
    },
    eyeButton: {
      position: 'absolute',
      right: 16,
      top: 14,
    },
    registerButton: {
      backgroundColor: "#FDB63B",
      borderRadius: 30,
      paddingVertical: 14,
      alignItems: 'center',
      marginBottom: 20,
    },
    registerButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    loginPrompt: {
      textAlign: 'center',
      marginBottom: 10,
      fontSize: 14,
      color: '#444',
    },
    loginButton: {
      borderWidth: 2,
      borderColor: "#FDB63B",
      borderRadius: 30,
      paddingVertical: 14,
      alignItems: 'center',
    },
    loginText: {
      color: "#FDB63B",
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  export default registerStyles;