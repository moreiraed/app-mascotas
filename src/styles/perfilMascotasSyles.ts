import { StyleSheet } from 'react-native';

export const perfilMascotaStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7EFE9',

  },
  
  // Imagen grande arriba
  petImageContainer: {
    width: '100%',
    height: 300,
    borderRadius: 5 ,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  petImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // Caja contenedora principal
  contentBox: {
    backgroundColor: '#FFFFFF',
    marginTop: -20,
    borderRadius: 20,
    paddingTop: 25,
    paddingHorizontal: 20,
    paddingBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1,
  },
  
  // Nombre de la mascota
  petNameContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  
  petName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  
  // Contenedor para los datos de la mascota
  petInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 25,
  },
  
  // Estilos para cada dato individual
  infoItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 15,
    backgroundColor: '#F8F9FA',
    marginHorizontal: 5,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 2,
  },
  
  infoLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  
  // Estilos para iconos (opcional)
  infoIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },

  // Estilos para el calendario
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  calendarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'left',
  },

  // Estilos para el calendario pequeño
  calendarContainerSmall: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    height: 120,
    width: '45%',
    overflow: 'hidden',
  },

  // Estilos para el calendario expandido
  calendarContainerExpanded: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: 400,
  },

  // Botón para expandir/contraer
  expandButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    backgroundColor: '#FF9F00',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  expandButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Overlay para el calendario pequeño
  calendarOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  overlayText: {
    color: '#FF9F00',
    fontSize: 14,
    fontWeight: '600',
    
  },
});
