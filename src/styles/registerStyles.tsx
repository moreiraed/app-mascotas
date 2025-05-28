import { StyleSheet } from 'react-native';

const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
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
    textAlign: 'left',  // Alinea el texto a la izquierda
    flex: 1,  // Hace que el texto ocupe el espacio disponible y empuje el checkbox a la derecha
  },
  footerLinkTC: {
    fontSize: 16,
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
});

export default registerStyles;