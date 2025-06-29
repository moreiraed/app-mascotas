import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PetData } from '../../types/libretaSanitaria.types';
import { useVaccines } from '../../hooks/useVaccines';
import { EmptyState } from '../EmptyState';
import { DataList } from '../DataList';
import { AddVaccineModal } from '../modals/AddVaccineModal';
import { Vaccine } from '../../types/libretaSanitaria.types';

interface VacunasSectionProps {
  userId: string;
  petId: string;
  petData: PetData;
}

export const VacunasSection: React.FC<VacunasSectionProps> = ({ userId, petId, petData }) => {
  const { vaccines, addVaccine, deleteVaccine } = useVaccines(userId, petId);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddVaccine = async (type: string, date: Date) => {
    const success = await addVaccine({ type, date });
    if (success) {
      setShowAddModal(false);
    }
  };

  if (vaccines.length === 0) {
    return (
      <View style={styles.section}>
        <EmptyState
          icon="vaccines"
          title="No hay vacunas registradas"
          description={`Aquí podrás ver el historial de vacunas de ${petData.name}`}
          buttonText="Agregar Vacuna"
          onPress={() => setShowAddModal(true)}
        />
        <AddVaccineModal
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddVaccine}
        />
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <DataList<Vaccine>
        title="Historial de Vacunas"
        data={vaccines}
        onAdd={() => setShowAddModal(true)}
        onDelete={deleteVaccine}
      />
      <AddVaccineModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddVaccine}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
}); 