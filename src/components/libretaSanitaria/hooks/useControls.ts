import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Control, NewControl } from '../types/libretaSanitaria.types';
import { loadControls, saveControls } from '../utils/storageUtils';
import { addEventForPet, removeEventForPet } from '../utils/calendarEventsStorage';

export const useControls = (userId: string, petId: string) => {
  const [controls, setControls] = useState<Control[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadControlsData();
  }, [userId, petId]);

  const loadControlsData = async () => {
    if (!userId || !petId) return;
    
    try {
      setIsLoading(true);
      const data = await loadControls(userId, petId);
      setControls(data);
    } catch (error) {
      console.error('Error loading controls:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addControl = async (newControl: NewControl) => {
    if (!newControl.type.trim()) {
      Alert.alert('Error', 'Por favor ingresa el tipo de control');
      return false;
    }

    if (!newControl.weight.trim()) {
      Alert.alert('Error', 'Por favor ingresa el peso del animal');
      return false;
    }

    try {
      const controlToSave: Control = {
        id: Date.now().toString(),
        type: newControl.type.trim(),
        date: newControl.date.toISOString(),
        weight: newControl.weight.trim(),
        diagnosis: newControl.diagnosis.trim(),
        treatment: newControl.treatment.trim(),
        createdAt: new Date().toISOString(),
      };

      const updatedControls = [...controls, controlToSave];
      await saveControls(userId, petId, updatedControls);
      setControls(updatedControls);
      // Sincronizar con calendario
      await addEventForPet(petId, {
        id: controlToSave.id,
        petId,
        date: controlToSave.date.slice(0, 10),
        type: 'control',
        title: `Control: ${controlToSave.type}`,
        description: `Peso: ${controlToSave.weight}\nDiagnóstico: ${controlToSave.diagnosis}\nTratamiento: ${controlToSave.treatment}`,
        relatedId: controlToSave.id,
      });
      Alert.alert('Éxito', 'Control registrado correctamente');
      return true;
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el control');
      return false;
    }
  };

  const deleteControl = async (controlId: string) => {
    Alert.alert(
      'Eliminar control',
      '¿Estás seguro de que quieres eliminar este control?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedControls = controls.filter(c => c.id !== controlId);
              await saveControls(userId, petId, updatedControls);
              setControls(updatedControls);
              // Eliminar evento del calendario
              await removeEventForPet(petId, controlId);
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el control');
            }
          },
        },
      ]
    );
  };

  return {
    controls,
    isLoading,
    addControl,
    deleteControl,
    reload: loadControlsData,
  };
}; 