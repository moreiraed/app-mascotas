import { StyleSheet } from 'react-native';

const indexStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FDB63B', // Color del botón
    paddingVertical: 15,         // 👈 Altura (más padding arriba y abajo)
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 50,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default indexStyles;