import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { PetData } from '../types/libretaSanitaria.types';
import imagePath from '@/src/constants/imagePath';

interface PetInfoCardProps {
  petData: PetData;
}

export const PetInfoCard: React.FC<PetInfoCardProps> = ({ petData }) => {
  // Determina el source de la imagen correctamente
  let imageSource;
  if (
    petData.image &&
    (petData.image.startsWith('http') || petData.image.startsWith('file')) &&
    petData.image.length > 10
  ) {
    imageSource = { uri: petData.image.trim() };
  } else if (petData.image && imagePath[petData.image as keyof typeof imagePath]) {
    imageSource = imagePath[petData.image as keyof typeof imagePath];
  } else {
    imageSource = imagePath.cat01;
  }

  return (
    <View style={styles.petInfoCard}>
      <Image source={imageSource} style={styles.petImage} />
      <View style={styles.petInfo}>
        <Text style={styles.petName}>{petData.name}</Text>
        <View style={styles.petDetails}>
          <Text style={styles.petDetail}>Sexo: {petData.sex}</Text>
          <Text style={styles.petDetail}>Color: {petData.color}</Text>
          <Text style={styles.petDetail}>Edad: {petData.age}</Text>
          <Text style={styles.petDetail}>Peso: {petData.weight}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  petInfoCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  petDetails: {
    gap: 4,
  },
  petDetail: {
    fontSize: 14,
    color: '#666',
  },
}); 