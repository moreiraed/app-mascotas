// utils/almacen.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pet } from '@/src/types/publicationsTypes';

const PETS_KEY = '@pets';

export const savePet = async (pet: Omit<Pet, 'id' | 'createdAt'>) => {
  try {
    const newPet = {
      ...pet,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };

    const existingPets = await getPets();
    const updatedPets = [...existingPets, newPet];
    
    await AsyncStorage.setItem(PETS_KEY, JSON.stringify(updatedPets));
    return newPet;
  } catch (error) {
    console.error('Error saving pet:', error);
    throw error;
  }
};

export const getPets = async (): Promise<Pet[]> => {
  try {
    const petsJson = await AsyncStorage.getItem(PETS_KEY);
    return petsJson ? JSON.parse(petsJson) : [];
  } catch (error) {
    console.error('Error getting pets:', error);
    return [];
  }
};

export const getPetsByStatus = async (status: 'lost' | 'adoption'): Promise<Pet[]> => {
  const pets = await getPets();
  return pets.filter(pet => pet.status === status);
};

export const getPetById = async (id: string): Promise<Pet | undefined> => {
  const pets = await getPets();
  return pets.find(pet => pet.id === id);
};

export const deletePet = async (id: string) => {
  try {
    const pets = await getPets();
    const updatedPets = pets.filter(pet => pet.id !== id);
    await AsyncStorage.setItem(PETS_KEY, JSON.stringify(updatedPets));
    return true;
  } catch (error) {
    console.error('Error deleting pet:', error);
    return false;
  }
};