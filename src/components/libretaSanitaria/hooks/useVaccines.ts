import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Vaccine, NewVaccine } from '../types/libretaSanitaria.types';
import { loadVaccines, saveVaccines } from '../utils/storageUtils';
import { addEventForPet, removeEventForPet } from '../utils/calendarEventsStorage';

export const useVaccines = (userId: string, petId: string) => {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVaccinesData();
  }, [userId, petId]);

  const loadVaccinesData = async () => {
    if (!userId || !petId) return;
    
    try {
      setIsLoading(true);
      const data = await loadVaccines(userId, petId);
      setVaccines(data);
    } catch (error) {
      console.error('Error loading vaccines:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addVaccine = async (newVaccine: NewVaccine) => {
    if (!newVaccine.type.trim()) {
      Alert.alert('Error', 'Por favor ingresa el tipo de vacuna');
      return false;
    }

    try {
      const vaccineToSave: Vaccine = {
        id: Date.now().toString(),
        type: newVaccine.type.trim(),
        date: newVaccine.date.toISOString(),
        createdAt: new Date().toISOString(),
      };

      const updatedVaccines = [...vaccines, vaccineToSave];
      await saveVaccines(userId, petId, updatedVaccines);
      setVaccines(updatedVaccines);
      // Sincronizar con calendario
      await addEventForPet(petId, {
        id: vaccineToSave.id,
        petId,
        date: vaccineToSave.date.slice(0, 10),
        type: 'vacuna',
        title: `Vacuna: ${vaccineToSave.type}`,
        description: '',
        relatedId: vaccineToSave.id,
      });
      Alert.alert('Éxito', 'Vacuna registrada correctamente');
      return true;
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la vacuna');
      return false;
    }
  };

  const deleteVaccine = async (vaccineId: string) => {
    Alert.alert(
      'Eliminar vacuna',
      '¿Estás seguro de que quieres eliminar esta vacuna?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedVaccines = vaccines.filter(v => v.id !== vaccineId);
              await saveVaccines(userId, petId, updatedVaccines);
              setVaccines(updatedVaccines);
              // Eliminar evento del calendario
              await removeEventForPet(petId, vaccineId);
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar la vacuna');
            }
          },
        },
      ]
    );
  };

  return {
    vaccines,
    isLoading,
    addVaccine,
    deleteVaccine,
    reload: loadVaccinesData,
  };
}; 