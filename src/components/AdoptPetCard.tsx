import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;
const IMAGE_HEIGHT = CARD_WIDTH * 0.8;

interface Pet {
  id: string;
  image: string | number;
  name: string;
  type: string;
  breed: string;
  location: string;
  date: string;
  isFavorite?: boolean;
}

interface LostPetCardProps {
  pet: Pet;
  onDetailsPress: () => void;
  onFavoritePress?: (petId: string) => void;
  onMorePress?: (petId: string) => void;
}

export const LostPetCard: React.FC<LostPetCardProps> = ({ 
  pet, 
  onDetailsPress, 
  onFavoritePress, 
  onMorePress 
}) => {
  return (
    <View style={[styles.cardContainer, { width: CARD_WIDTH }]}>
      {/* Contenedor de la card */}
      <View style={styles.card}>
        {/* Contenedor de imagen con tamaño fijo */}
        <View style={styles.imageContainer}>
          <Image 
            source={typeof pet.image === 'string' ? { uri: pet.image } : pet.image} 
            style={styles.image}
            resizeMode="cover"
          />
          
          {/* Contenedor de acciones superiores */}
          <View style={styles.actionsContainer}>
            {onFavoritePress && (
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => onFavoritePress(pet.id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons 
                  name={pet.isFavorite ? "heart" : "heart-outline"} 
                  size={24} 
                  color={pet.isFavorite ? "#FF5A5F" : "#FFF"} 
                />
              </TouchableOpacity>
            )}
            
            {onMorePress && (
              <TouchableOpacity 
                style={styles.iconButton}
                onPress={() => onMorePress(pet.id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons 
                  name="ellipsis-vertical" 
                  size={20} 
                  color="#FFF" 
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        {/* Contenido debajo de la imagen */}
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>{pet.name}</Text>
          
          <View style={styles.metaContainer}>
            <Text style={styles.type}>{pet.type}</Text>
            <View style={styles.dotSeparator} />
            <Text style={styles.breed} numberOfLines={1}>{pet.breed}</Text>
          </View>
          
          <Text style={styles.date}>En adopción desde: {pet.date}</Text>
        </View>
      </View>
      
      {/* Botón de acción principal */}
      <TouchableOpacity 
        style={styles.actionButton} 
        onPress={onDetailsPress}
        activeOpacity={0.7}
      >
        <Text style={styles.actionButtonText}>Ver detalles</Text>
        <Ionicons name="chevron-forward" size={16} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    marginVertical: 8,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  card: {
    width: '100%',
  },
  imageContainer: {
    width: '100%',
    height: IMAGE_HEIGHT,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  actionsContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 4,
  },
  iconButton: {
    padding: 4,
    marginHorizontal: 2,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  type: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  breed: {
    fontSize: 14,
    color: '#666',
    flexShrink: 1,
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#999',
    marginHorizontal: 8,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginRight: 4,
  },
});