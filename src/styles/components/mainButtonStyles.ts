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
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
    borderRadius: 30,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default loginStyles;