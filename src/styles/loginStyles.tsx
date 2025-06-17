import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: moderateScale(30),
    gap: moderateScale(10),
  },
  title: {
    alignItems: 'center',
    paddingVertical: moderateScale(10),
  },
  input: {
    backgroundColor: '#eee',
    borderRadius: 30,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    color: '#FF9F00',
    fontSize: 14,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: '#777',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#777',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#777',
  },
  footerLink: {
    flex: 1,
    fontSize: 14,
    color: '#FF9F00',
    marginLeft: 5,
  },
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',  
    width: '90%',
  },
  footerTextTC: {
    fontSize: 14,
    color: '#777',
    textAlign: 'left',
    flex: 1,
  },
  footerLinkTC: {
    fontSize: 16,
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
});

export default loginStyles;