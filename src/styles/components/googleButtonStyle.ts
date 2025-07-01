import colors from '@/src/constants/colors';
import { StyleSheet } from 'react-native';

const google = StyleSheet.create({
    containerShort: {
      alignSelf: 'center',
    },
    containerLong: {
      alignSelf: 'stretch'
    },
    button: {
      alignItems: 'center',
      paddingVertical: 8,
      borderWidth: 2,
      borderRadius: 30,
      borderColor: "#E3E5E5",
      paddingHorizontal: 30,
      flexDirection: 'row',
    },
    text: {
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: 'bold',
    },
    icon: {
      marginRight: 1, // Espacio entre el ícono y el texto
    },
  });

  export default google;