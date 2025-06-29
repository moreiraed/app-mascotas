import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { PetData } from '../../types/libretaSanitaria.types';
import { useStudies } from '../../hooks/useStudies';
import { EmptyState } from '../EmptyState';
import { DataList } from '../DataList';
import { AddStudyModal } from '../modals/AddStudyModal';
import { StudyDetailsModal } from '../modals/StudyDetailsModal';
import { Study } from '../../types/libretaSanitaria.types';

interface EstudiosSectionProps {
  userId: string;
  petId: string;
  petData: PetData;
}

export const EstudiosSection: React.FC<EstudiosSectionProps> = ({ userId, petId, petData }) => {
  const { studies, addStudy, deleteStudy } = useStudies(userId, petId);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);

  const handleAddStudy = async (type: string, date: Date) => {
    const success = await addStudy({ type, date });
    if (success) {
      setShowAddModal(false);
    }
  };

  const handleStudyPress = (study: Study) => {
    setSelectedStudy(study);
    setShowDetailsModal(true);
  };

  if (studies.length === 0) {
    return (
      <View style={styles.section}>
        <EmptyState
          icon="science"
          title="No hay estudios registrados"
          description={`Aquí podrás ver los estudios médicos de ${petData.name}`}
          buttonText="Agregar Estudio"
          onPress={() => setShowAddModal(true)}
        />
        <AddStudyModal
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddStudy}
        />
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <DataList<Study>
        title="Historial de Estudios"
        data={studies}
        onAdd={() => setShowAddModal(true)}
        onDelete={deleteStudy}
        onItemPress={handleStudyPress}
      />
      <AddStudyModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddStudy}
      />
      <StudyDetailsModal
        visible={showDetailsModal}
        study={selectedStudy}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedStudy(null);
        }}
        onDelete={(studyId) => {
          deleteStudy(studyId);
          setShowDetailsModal(false);
          setSelectedStudy(null);
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
}); 