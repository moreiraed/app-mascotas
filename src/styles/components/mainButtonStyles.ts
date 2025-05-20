import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
    containerShort: {
      alignSelf: 'center',
    },
    containerLong: {
      alignSelf: 'stretch'
    },
    button: {
      alignItems: 'center',
      paddingVertical: 14,
      paddingHorizontal: 30,
      backgroundColor: "#FF9F00",
      borderRadius: 30,
      marginBottom: 20
    },
    text: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    }
  });

  export default loginStyles;