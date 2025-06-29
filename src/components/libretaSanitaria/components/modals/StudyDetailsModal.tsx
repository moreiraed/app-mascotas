import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BaseModal } from './BaseModal';
import { Study } from '../../types/libretaSanitaria.types';
import { formatDate } from '../../utils/dateUtils';

interface StudyDetailsModalProps {
  visible: boolean;
  study: Study | null;
  onClose: () => void;
  onDelete: (studyId: string) => void;
}

export const StudyDetailsModal: React.FC<StudyDetailsModalProps> = ({
  visible,
  study,
  onClose,
  onDelete,
}) => {
  const handleDelete = () => {
    if (study) {
      onDelete(study.id);
    }
  };

  return (
    <BaseModal
      visible={visible}
      title="Detalles del Estudio"
      onClose={onClose}
      showSaveButton={false}
    >
      {study && (
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Tipo de Estudio</Text>
            <Text style={styles.detailText}>{study.type}</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Fecha del Estudio</Text>
            <Text style={styles.detailText}>{formatDate(study.date)}</Text>
          </View>
        </>
      )}

      <View style={styles.modalFooter}>
        <TouchableOpacity
          style={styles.deleteModalButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteModalButtonText}>Eliminar Estudio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeModalButton}
          onPress={onClose}
        >
          <Text style={styles.closeModalButtonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  deleteModalButton: {
    backgroundColor: '#FF5252',
    padding: 12,
    borderRadius: 8,
  },
  deleteModalButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeModalButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
  },
  closeModalButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
}); 