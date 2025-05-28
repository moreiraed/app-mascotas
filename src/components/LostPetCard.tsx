import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Pet {
  image: string | number; // Acepta URI (string) o require (number)
  name: string;
  type: string;
  breed: string;
  location: string;
  date: string;
}

interface LostPetCardProps {
  pet: Pet;
  onPress: () => void; // Aca redirigimos a la pantalla de detalles del animal perdido
}

export const LostPetCard: React.FC<LostPetCardProps> = ({ pet, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Imagen de fondo (ocupa toda la card) */}
      <Image 
        source={typeof pet.image === 'string' ? { uri: pet.image } : pet.image} 
        style={styles.image}
      />
      
      {/* Capa oscura para mejorar legibilidad */}
      <View style={styles.overlay} />
      
      {/* Contenido superpuesto */}
      <View style={styles.content}>
        <Text style={styles.name}>{pet.name}</Text>
        <Text style={styles.type}>{pet.type} • {pet.breed}</Text>
        
        <View style={styles.details}>
          <Ionicons name="location-sharp" size={16} color="#FFF" />
          <Text style={styles.location}> {pet.location}</Text>
        </View>
        
        <Text style={styles.date}>Perdido el: {pet.date}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Estilos actualizados
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
  type: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  date: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
