import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Deworming, NewDeworming } from '../types/libretaSanitaria.types';
import { loadDewormings, saveDewormings } from '../utils/storageUtils';

export const useDewormings = (userId: string, petId: string) => {
  const [dewormings, setDewormings] = useState<Deworming[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDewormingsData();
  }, [userId, petId]);

  const loadDewormingsData = async () => {
    if (!userId || !petId) return;
    
    try {
      setIsLoading(true);
      const data = await loadDewormings(userId, petId);
      setDewormings(data);
    } catch (error) {
      console.error('Error loading dewormings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addDeworming = async (newDeworming: NewDeworming) => {
    if (!newDeworming.type.trim()) {
      Alert.alert('Error', 'Por favor ingresa el tipo de desparasitante');
      return false;
    }

    try {
      const dewormingToSave: Deworming = {
        id: Date.now().toString(),
        type: newDeworming.type.trim(),
        date: newDeworming.date.toISOString(),
        createdAt: new Date().toISOString(),
      };

      const updatedDewormings = [...dewormings, dewormingToSave];
      await saveDewormings(userId, petId, updatedDewormings);
      setDewormings(updatedDewormings);
      Alert.alert('Éxito', 'Desparasitación registrada correctamente');
      return true;
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la desparasitación');
      return false;
    }
  };

  const deleteDeworming = async (dewormingId: string) => {
    Alert.alert(
      'Eliminar desparasitación',
      '¿Estás seguro de que quieres eliminar esta desparasitación?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedDewormings = dewormings.filter(d => d.id !== dewormingId);
              await saveDewormings(userId, petId, updatedDewormings);
              setDewormings(updatedDewormings);
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar la desparasitación');
            }
          },
        },
      ]
    );
  };

  return {
    dewormings,
    isLoading,
    addDeworming,
    deleteDeworming,
    reload: loadDewormingsData,
  };
}; 