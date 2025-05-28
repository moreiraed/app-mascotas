import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AdoptionPet {
  image: string | number;
  name: string;
  age: string;           // Ej: "3 meses", "2 años"
  breed: string;
  location: string;
  gender: 'Macho' | 'Hembra';
}

interface AdoptionPetCardProps {
  pet: AdoptionPet;
  onPress: () => void;
}

export const AdoptionPetCard: React.FC<AdoptionPetCardProps> = ({ pet, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image 
        source={typeof pet.image === 'string' ? { uri: pet.image } : pet.image} 
        style={styles.image}
      />

      <View style={styles.overlay} />

      <View style={styles.content}>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.details}>{pet.age} • {pet.gender} • {pet.breed}</Text>

        <View style={styles.locationContainer}>
          <Ionicons name="location-sharp" size={16} color="#FFF" />
          <Text style={styles.location}> {pet.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Estilos
const styles = StyleSheet.create({
  card: {
    height: 240,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  details: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
