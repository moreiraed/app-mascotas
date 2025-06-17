import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import lostPets from '@/src/constants/lostPets'; // Tus datos

export default function PetMap() {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [selectedPet, setSelectedPet] = useState<typeof lostPets[0] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Obtener ubicación del usuario
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  // Filtra mascotas con coordenadas
  const petsWithLocation = lostPets.filter(pet => pet.latitude && pet.longitude);

  return (
    <View style={styles.container}>
      {/* Mapa */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -27.4516, // Resistencia por defecto
          longitude: -58.9867,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        region={userLocation ? {
          ...userLocation,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        } : undefined}
      >
        {/* Marcador del usuario */}
        {userLocation && (
          <Marker coordinate={userLocation}>
            <View style={styles.userMarker}>
              <Image source={require('@/src/assets/images/splash-icon.png')} style={styles.userMarkerImage} />
            </View>
          </Marker>
        )}

        {/* Marcadores de mascotas */}
        {petsWithLocation.map((pet) => (
          <Marker
            key={pet.id}
            coordinate={{ latitude: pet.latitude!, longitude: pet.longitude! }}
            onPress={() => {
              setSelectedPet(pet);
              setModalVisible(true);
            }}
          >
            <View style={styles.petMarker}>
              <Image source={pet.image} style={styles.petMarkerImage} />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Modal de detalles */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          {selectedPet && (
            <View style={styles.modalContent}>
              <Image source={selectedPet.image} style={styles.petImage} />
              <Text style={styles.petName}>{selectedPet.name}</Text>
              <Text>{selectedPet.type} | {selectedPet.breed}</Text>
              <Text>Perdido el: {selectedPet.date}</Text>
              <Text>{selectedPet.location}</Text>
              
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  petMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
  },
  petMarkerImage: {
    width: '100%',
    height: '100%',
  },
  userMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userMarkerImage: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  petImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});