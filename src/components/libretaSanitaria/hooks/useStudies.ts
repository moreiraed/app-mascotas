import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Study, NewStudy } from '../types/libretaSanitaria.types';
import { loadStudies, saveStudies } from '../utils/storageUtils';
import { addEventForPet, removeEventForPet } from '../utils/calendarEventsStorage';

export const useStudies = (userId: string, petId: string) => {
  const [studies, setStudies] = useState<Study[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStudiesData();
  }, [userId, petId]);

  const loadStudiesData = async () => {
    if (!userId || !petId) return;
    
    try {
      setIsLoading(true);
      const data = await loadStudies(userId, petId);
      setStudies(data);
    } catch (error) {
      console.error('Error loading studies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addStudy = async (newStudy: NewStudy) => {
    if (!newStudy.type.trim()) {
      Alert.alert('Error', 'Por favor ingresa el tipo de estudio');
      return false;
    }

    try {
      const studyToSave: Study = {
        id: Date.now().toString(),
        type: newStudy.type.trim(),
        date: newStudy.date.toISOString(),
        createdAt: new Date().toISOString(),
      };

      const updatedStudies = [...studies, studyToSave];
      await saveStudies(userId, petId, updatedStudies);
      setStudies(updatedStudies);
      // Sincronizar con calendario
      await addEventForPet(petId, {
        id: studyToSave.id,
        petId,
        date: studyToSave.date.slice(0, 10),
        type: 'estudio',
        title: `Estudio: ${studyToSave.type}`,
        description: '',
        relatedId: studyToSave.id,
      });
      Alert.alert('Éxito', 'Estudio registrado correctamente');
      return true;
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el estudio');
      return false;
    }
  };

  const deleteStudy = async (studyId: string) => {
    Alert.alert(
      'Eliminar estudio',
      '¿Estás seguro de que quieres eliminar este estudio?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedStudies = studies.filter(s => s.id !== studyId);
              await saveStudies(userId, petId, updatedStudies);
              setStudies(updatedStudies);
              // Eliminar evento del calendario
              await removeEventForPet(petId, studyId);
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el estudio');
            }
          },
        },
      ]
    );
  };

  return {
    studies,
    isLoading,
    addStudy,
    deleteStudy,
    reload: loadStudiesData,
  };
}; 