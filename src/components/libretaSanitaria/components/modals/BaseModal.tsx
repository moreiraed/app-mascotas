import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface BaseModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  onSave?: () => void;
  saveText?: string;
  showSaveButton?: boolean;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  visible,
  title,
  onClose,
  children,
  onSave,
  saveText = 'Guardar',
  showSaveButton = true,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            <ScrollView 
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.scrollContent}
            >
              {children}
            </ScrollView>
          </View>

          {showSaveButton && onSave && (
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelModalButton}
                onPress={onClose}
              >
                <Text style={styles.cancelModalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveModalButton}
                onPress={onSave}
              >
                <Text style={styles.saveModalButtonText}>{saveText}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '90%',
    maxHeight: '95%',
    minHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  modalBody: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  cancelModalButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
  },
  cancelModalButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  saveModalButton: {
    backgroundColor: '#FF9F00',
    padding: 12,
    borderRadius: 8,
  },
  saveModalButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
}); 