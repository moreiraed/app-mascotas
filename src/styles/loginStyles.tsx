import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
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
    borderRadius: 30,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  forgotText: {
    color: '#FF9F00',
    fontSize: 14,
  },
  lineContainer: {
    marginTop: 14,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default loginStyles;