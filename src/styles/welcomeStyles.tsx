import { StyleSheet } from 'react-native';

const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    gap: 20,
  },
  image: {
    width: 250,
    height: 250,
  },
  button: {
    backgroundColor: '#FDB63B', 
    paddingVertical: 14,         
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    textAlign: "center",
    paddingHorizontal: 10,
  },
});

export default welcomeStyles;