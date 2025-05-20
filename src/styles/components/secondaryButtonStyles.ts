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
      borderWidth: 2,
      borderRadius: 30,
      borderColor: "#FF9F00",
      paddingHorizontal: 30
    },
    text: {
      color: "#FDB63B",
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  export default loginStyles;