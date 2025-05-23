import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters'

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: moderateScale(70),
    backgroundColor: 'white',
  },
  header: {
    // Por ahora no es necesario
  },
  body: {
    alignItems: 'center',
  },
  footer: {
    height: verticalScale(70) ,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    width: moderateScale(75),
    height: moderateScale(75),
  },
});

export default loginStyles;