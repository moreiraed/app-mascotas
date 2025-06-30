// app/(tabs)/encontrar/[id].tsx
// app/(tabs)/encontrar/[id].tsx
import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, Alert, ActivityIndicator } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { usePets } from '../../../contexts/PetsContext';
import { useEffect, useState } from 'react';
import { Pet } from '@/src/types/publicationsTypes';
import { useAuth } from '@/src/hooks/useAuth';

export default function PetDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { getPetById, removePet, refreshPets } = usePets();
  const { user } = useAuth(); // Obtener usuario actual
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadPet = async () => {
      if (typeof id === 'string') {
        const foundPet = await getPetById(id);
        setPet(foundPet || null);
        setLoading(false);
      }
    };
    loadPet();
  }, [id]);

  const handleCallOwner = () => {
    if (pet) {
      Linking.openURL(`tel:${pet.contact.phone}`);
    }
  };

  const handleMessageOwner = () => {
    if (pet) {
      Linking.openURL(`whatsapp://send?phone=${pet.contact.phone}&text=Hola ${pet.contact.name}, vi la publicación sobre ${pet.name}...`);
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Aquí deberías guardar el estado en AsyncStorage
  };

  const isOwner = pet?.ownerId === user?.id; // Verificar propiedad

  const handleDeletePet = async () => {
    if (!pet || !user) return;

    Alert.alert(
      'Eliminar publicación',
      '¿Estás seguro que quieres eliminar esta publicación?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await removePet(pet.id, user.id);
              router.back();
              refreshPets();
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : 'No se pudo eliminar la publicación';
              Alert.alert('Error', errorMessage);
            }
          },
        },
      ]
    );
  };

  const handleEditPet = () => {
    if (pet) {
      router.push(`/encontrar/edit/${pet.id}`);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4E9F3D" />
      </View>
    );
  }

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Mascota no encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Imagen principal */}
      <Image source={{ uri: pet.image }} style={styles.petImage} resizeMode="cover" />

      {/* Botón de retroceso */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>

      {/* Botón de favorito */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={handleToggleFavorite}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={24}
          color={isFavorite ? "#FF5A5F" : "#FFF"}
        />
      </TouchableOpacity>

      {/* Contenido principal */}
      <View style={styles.contentContainer}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.petName}>{pet.name}</Text>
          <View style={styles.petTypeContainer}>
            <Ionicons
              name={pet.type === 'Perro' ? 'paw' : pet.type === 'Gato' ? 'logo-octocat' : 'paw'}
              size={16}
              color="#FFF"
            />
            <Text style={styles.petType}>{pet.type}</Text>
          </View>
        </View>

        {/* Información básica */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Ionicons name="paw" size={18} color="#4E9F3D" />
            <Text style={styles.infoText}>Raza: {pet.breed}</Text>
          </View>

          {pet.age && (
            <View style={styles.infoRow}>
              <Ionicons name="time" size={18} color="#4E9F3D" />
              <Text style={styles.infoText}>Edad: {pet.age}</Text>
            </View>
          )}

          {pet.gender && (
            <View style={styles.infoRow}>
              <Ionicons
                name={pet.gender === 'Macho' ? 'male' : 'female'}
                size={18}
                color="#4E9F3D"
              />
              <Text style={styles.infoText}>Sexo: {pet.gender}</Text>
            </View>
          )}

          {pet.color && (
            <View style={styles.infoRow}>
              <Ionicons name="color-palette" size={18} color="#4E9F3D" />
              <Text style={styles.infoText}>Color: {pet.color}</Text>
            </View>
          )}
        </View>

        {/* Descripción */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.sectionContent}>{pet.description}</Text>
        </View>

        {/* Última vez visto (solo para perdidos) */}
        {pet.status === 'lost' && pet.lastSeenDescription && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Última vez visto</Text>
            <Text style={styles.sectionContent}>{pet.lastSeenDescription}</Text>
          </View>
        )}

        {/* Características especiales */}
        {pet.specialFeatures && pet.specialFeatures.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Características especiales</Text>
            {pet.specialFeatures.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureBullet} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Mapa (solo para perdidos con ubicación) */}
        {pet.status === 'lost' && pet.latitude && pet.longitude && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Última ubicación conocida</Text>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: pet.latitude,
                  longitude: pet.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <Marker
                  coordinate={{
                    latitude: pet.latitude,
                    longitude: pet.longitude,
                  }}
                  title={pet.name}
                  description={pet.location}
                />
              </MapView>
            </View>
            <Text style={styles.locationText}>{pet.location}</Text>
          </View>
        )}

        {/* Información de contacto */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de contacto</Text>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>{pet.contact.name}</Text>
            <Text style={styles.contactPhone}>{pet.contact.phone}</Text>
            {pet.contact.email && (
              <Text style={styles.contactEmail}>{pet.contact.email}</Text>
            )}
          </View>

          {/* Botones de acción */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.callButton]}
              onPress={handleCallOwner}
            >
              <MaterialIcons name="call" size={20} color="#FFF" />
              <Text style={styles.actionButtonText}>Llamar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.messageButton]}
              onPress={handleMessageOwner}
            >
              <FontAwesome name="whatsapp" size={20} color="#FFF" />
              <Text style={styles.actionButtonText}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recompensa (solo para perdidos) */}
        {pet.status === 'lost' && pet.reward && (
          <View style={styles.rewardContainer}>
            <Ionicons name="trophy" size={24} color="#FFD700" />
            <Text style={styles.rewardText}>Se ofrece recompensa</Text>
          </View>
        )}

        {/* Mostrar botones solo si es el propietario */}
        {isOwner && (
          <View style={styles.ownerActions}>
            <TouchableOpacity
              style={[styles.ownerButton, styles.editButton]}
              onPress={handleEditPet}
            >
              <Ionicons name="create" size={18} color="#FFF" />
              <Text style={styles.ownerButtonText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.ownerButton, styles.deleteButton]}
              onPress={handleDeletePet}
            >
              <Ionicons name="trash" size={18} color="#FFF" />
              <Text style={styles.ownerButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Fecha */}
        <Text style={styles.dateText}>Publicado el: {pet.date}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  petImage: {
    width: '100%',
    height: 350,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 10,
    zIndex: 10,
  },
  favoriteButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 10,
    zIndex: 10,
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  petName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  petTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4E9F3D',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  petType: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 6,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  featureBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4E9F3D',
    marginTop: 8,
    marginRight: 10,
  },
  featureText: {
    flex: 1,
    fontSize: 16,
    color: '#555',
  },
  mapContainer: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  contactInfo: {
    marginBottom: 20,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  contactPhone: {
    fontSize: 16,
    color: '#4E9F3D',
    marginBottom: 5,
  },
  contactEmail: {
    fontSize: 16,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
  },
  callButton: {
    backgroundColor: '#4E9F3D',
    marginRight: 10,
  },
  messageButton: {
    backgroundColor: '#25D366',
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  rewardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D4AF37',
    marginLeft: 10,
  },
  ownerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  ownerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
  },
  editButton: {
    backgroundColor: '#3498db',
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  ownerButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: '#FF6B6B',
    textAlign: 'center',
    marginTop: 20,
  },
});