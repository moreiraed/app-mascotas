import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PetData } from '../../types/libretaSanitaria.types';
import { useDewormings } from '../../hooks/useDewormings';
import { EmptyState } from '../EmptyState';
import { DataList } from '../DataList';
import { AddDewormingModal } from '../modals/AddDewormingModal';

interface DesparasitacionesSectionProps {
  userId: string;
  petId: string;
  petData: PetData;
}

export const DesparasitacionesSection: React.FC<DesparasitacionesSectionProps> = ({ userId, petId, petData }) => {
  const { dewormings, addDeworming, deleteDeworming } = useDewormings(userId, petId);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddDeworming = async (type: string, date: Date) => {
    const success = await addDeworming({ type, date });
    if (success) {
      setShowAddModal(false);
    }
  };

  if (dewormings.length === 0) {
    return (
      <View style={styles.section}>
        <EmptyState
          icon="medication"
          title="No hay desparasitaciones registradas"
          description={`Aquí podrás ver el historial de desparasitaciones de ${petData.name}`}
          buttonText="Agregar Desparasitación"
          onPress={() => setShowAddModal(true)}
        />
        <AddDewormingModal
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddDeworming}
        />
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <DataList<Deworming>
        title="Historial de Desparasitaciones"
        data={dewormings}
        onAdd={() => setShowAddModal(true)}
        onDelete={deleteDeworming}
      />
      <AddDewormingModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddDeworming}
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