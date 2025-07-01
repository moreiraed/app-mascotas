import { StyleSheet } from 'react-native';
import colors from '../constants/colors';
import { moderateScale } from "react-native-size-matters"

const fontStyles = StyleSheet.create({
  granTitulo:{
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: moderateScale(32),
    color: colors.textPrimary,
  },
  titulo: {
    fontFamily: 'Nunito_700Bold',
    fontSize: moderateScale(26),
    color: colors.textPrimary,
  },
  subtitulo: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: moderateScale(20),
    color: colors.textPrimary,
  },
  text: {
    fontFamily: 'Nunito_400Regular',
    fontSize: moderateScale(16),
    color: colors.textPrimary,
  },
  textLight: {
    fontFamily: 'Nunito_400Regular',
    fontSize: moderateScale(16),
    color: colors.textSecondary,
  },
  buttonText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: moderateScale(16),
    color: colors.primary,
  },
  buttonTextLight: {
    fontFamily: 'Nunito_700Bold',
    fontSize: moderateScale(16),
    color: colors.white,
  },
  foroCardTitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: moderateScale(16),
    color: colors.textPrimary,
  },
  foroCardText: {
    fontFamily: 'Nunito_300Light',
    fontSize: moderateScale(12),
    color: colors.textSecondary,
  }
});

export default fontStyles;