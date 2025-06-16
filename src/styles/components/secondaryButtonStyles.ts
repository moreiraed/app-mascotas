import colors from '@/src/constants/colors';
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
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderWidth: 2,
      borderRadius: 30,
      borderColor: colors.primary,
    },
    text: {
      color: "#FDB63B",
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  export default loginStyles;