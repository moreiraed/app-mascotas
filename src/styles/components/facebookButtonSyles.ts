import { StyleSheet } from 'react-native';

const facebook = StyleSheet.create({
  containerShort: {
    alignSelf: 'center',
  },
  containerLong: {
    alignSelf: 'stretch',
  },
  button: {
    alignItems: 'center',   // Centra los elementos verticalmente en el contenedor
    paddingVertical: 14,
    paddingHorizontal: 30,
    backgroundColor: "#7583CA", // Color de fondo del botón
    borderRadius: 30,
    marginBottom: 20,
    flexDirection: 'row', // Asegura que el ícono y el texto estén en fila
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 1, // Espacio entre el ícono y el texto
  },
});

export default facebook;
