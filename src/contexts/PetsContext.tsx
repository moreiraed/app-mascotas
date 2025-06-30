// contexts/PetsContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Pet, PetStatus } from '@/src/types/publicationsTypes';
import { getPets, getPetsByStatus, savePet, deletePet, getPetById as storageGetPetById } from '@/src/utils/publicacionesStorage';

interface PetsContextType {
  lostPets: Pet[];
  adoptionPets: Pet[];
  loading: boolean;
  addPet: (pet: Omit<Pet, 'id' | 'createdAt'> & { ownerId: string }) => Promise<void>;
  removePet: (id: string, currentUserId: string) => Promise<void>; // Actualizado
  refreshPets: () => Promise<void>;
  getPetById: (id: string) => Promise<Pet | undefined>;
}

const PetsContext = createContext<PetsContextType>({
  lostPets: [],
  adoptionPets: [],
  loading: true,
  addPet: async () => { },
  removePet: async () => { },
  refreshPets: async () => { },
  getPetById: async () => undefined, // Añadido
});

export const PetsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lostPets, setLostPets] = useState<Pet[]>([]);
  const [adoptionPets, setAdoptionPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPets = async () => {
    try {
      setLoading(true);
      const [lost, adoption] = await Promise.all([
        getPetsByStatus('lost'),
        getPetsByStatus('adoption'),
      ]);
      setLostPets(lost);
      setAdoptionPets(adoption);
    } catch (error) {
      console.error('Error loading pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPet = async (pet: Omit<Pet, 'id' | 'createdAt'> & { ownerId: string }) => {
    // Crear un nuevo objeto con todas las propiedades necesarias
    const newPet: Pet = {
      ...pet,
      id: Date.now().toString(), // Generar un ID único
      createdAt: Date.now() // Añadir timestamp
    };

    await savePet(newPet);
    await loadPets();
  };

  const handleRemovePet = async (id: string, currentUserId: string) => {
    const pet = await storageGetPetById(id);
    if (pet && pet.ownerId !== currentUserId) {
      throw new Error('No tienes permiso para eliminar esta publicación');
    }
    await deletePet(id);
    await loadPets();
  };

  const handleGetPetById = async (id: string) => {
    return await storageGetPetById(id);
  };

  useEffect(() => {
    loadPets();
  }, []);

  return (
    <PetsContext.Provider
      value={{
        lostPets,
        adoptionPets,
        loading,
        addPet: handleAddPet,
        removePet: handleRemovePet,
        refreshPets: loadPets,
        getPetById: handleGetPetById, // Añadido
      }}
    >
      {children}
    </PetsContext.Provider>
  );
};

export const usePets = () => useContext(PetsContext);