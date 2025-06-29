import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PetData } from '../../types/libretaSanitaria.types';
import { useControls } from '../../hooks/useControls';
import { EmptyState } from '../EmptyState';
import { DataList } from '../DataList';
import { AddControlModal } from '../modals/AddControlModal';
import { ControlDetailsModal } from '../modals/ControlDetailsModal';
import { Control } from '../../types/libretaSanitaria.types';

interface ControlesSectionProps {
  userId: string;
  petId: string;
  petData: PetData;
}

export const ControlesSection: React.FC<ControlesSectionProps> = ({ userId, petId, petData }) => {
  const { controls, addControl, deleteControl } = useControls(userId, petId);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);

  const handleAddControl = async (controlData: {
    type: string;
    date: Date;
    weight: string;
    diagnosis: string;
    treatment: string;
  }) => {
    const success = await addControl(controlData);
    if (success) {
      setShowAddModal(false);
    }
  };

  const handleControlPress = (control: Control) => {
    setSelectedControl(control);
    setShowDetailsModal(true);
  };

  const renderExtraInfo = (control: Control) => (
    <>
      {control.weight && (
        <Text style={styles.controlNotes}>Peso: {control.weight}</Text>
      )}
      {control.diagnosis && (
        <Text style={styles.controlNotes}>Diagnóstico: {control.diagnosis}</Text>
      )}
      {control.treatment && (
        <Text style={styles.controlNotes}>Tratamiento: {control.treatment}</Text>
      )}
    </>
  );

  if (controls.length === 0) {
    return (
      <View style={styles.section}>
        <EmptyState
          icon="monitor-heart"
          title="No hay controles registrados"
          description={`Aquí podrás ver el historial de controles médicos de ${petData.name}`}
          buttonText="Agregar Control"
          onPress={() => setShowAddModal(true)}
        />
        <AddControlModal
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddControl}
        />
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <DataList<Control>
        title="Historial de Controles"
        data={controls}
        onAdd={() => setShowAddModal(true)}
        onDelete={deleteControl}
        onItemPress={handleControlPress}
        renderExtraInfo={renderExtraInfo}
      />
      <AddControlModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddControl}
      />
      <ControlDetailsModal
        visible={showDetailsModal}
        control={selectedControl}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedControl(null);
        }}
        onDelete={(controlId) => {
          deleteControl(controlId);
          setShowDetailsModal(false);
          setSelectedControl(null);
        }}
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
  controlNotes: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
}); 