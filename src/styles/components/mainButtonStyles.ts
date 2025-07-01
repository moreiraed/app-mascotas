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
    paddingHorizontal: 24,
    backgroundColor: colors.primary,
    borderRadius: 30,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Estilos nuevos agregados
  disabledButton: {
    backgroundColor: colors.primaryLight, // Asegúrate de tener este color definido en tus constantes
    opacity: 0.7,
  },
  loadingIndicator: {
    paddingVertical: 2, // Ajuste para centrar mejor el indicador
  },
});

export default loginStyles;