import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BaseModal } from './BaseModal';
import { Control } from '../../types/libretaSanitaria.types';
import { formatDate } from '../../utils/dateUtils';

interface ControlDetailsModalProps {
  visible: boolean;
  control: Control | null;
  onClose: () => void;
  onDelete: (controlId: string) => void;
}

export const ControlDetailsModal: React.FC<ControlDetailsModalProps> = ({
  visible,
  control,
  onClose,
  onDelete,
}) => {
  const handleDelete = () => {
    if (control) {
      onDelete(control.id);
    }
  };

  return (
    <BaseModal
      visible={visible}
      title="Detalles del Control"
      onClose={onClose}
      showSaveButton={false}
    >
      {control && (
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Tipo de Control</Text>
            <Text style={styles.detailText}>{control.type}</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Fecha de la Consulta</Text>
            <Text style={styles.detailText}>{formatDate(control.date)}</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Peso del Animal</Text>
            <Text style={styles.detailText}>{control.weight}</Text>
          </View>

          {control.diagnosis && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Diagnóstico</Text>
              <Text style={styles.detailText}>{control.diagnosis}</Text>
            </View>
          )}

          {control.treatment && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tratamiento</Text>
              <Text style={styles.detailText}>{control.treatment}</Text>
            </View>
          )}
        </>
      )}

      <View style={styles.modalFooter}>
        <TouchableOpacity
          style={styles.deleteModalButton}
          onPress={handleDelete}
        >
          <Text style={styles.deleteModalButtonText}>Eliminar Control</Text>
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