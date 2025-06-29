import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BaseModal } from './BaseModal';

interface AddDewormingModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (type: string, date: Date) => void;
}

export const AddDewormingModal: React.FC<AddDewormingModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [type, setType] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSave = () => {
    if (type.trim()) {
      onSave(type.trim(), date);
      setType('');
      setDate(new Date());
    }
  };

  const changeDate = (days: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  };

  const setToday = () => {
    setDate(new Date());
  };

  return (
    <BaseModal
      visible={visible}
      title="Agregar Desparasitación"
      onClose={onClose}
      onSave={handleSave}
    >
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Tipo de Desparasitante</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Ej: Endogard, Milbemax, etc."
          value={type}
          onChangeText={setType}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Fecha de Aplicación</Text>
        <View style={styles.dateSelector}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => changeDate(-1)}
          >
            <MaterialIcons name="chevron-left" size={20} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.dateDisplay}
            onPress={setToday}
          >
            <Text style={styles.dateButtonText}>
              {date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
            <MaterialIcons name="calendar-today" size={16} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => changeDate(1)}
          >
            <MaterialIcons name="chevron-right" size={20} color="#666" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.todayButton} onPress={setToday}>
          <Text style={styles.todayButtonText}>Hoy</Text>
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
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginHorizontal: 4,
  },
  dateDisplay: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 8,
  },
  dateButtonText: {
    fontSize: 14,
    color: '#333',
  },
  todayButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FF9F00',
    borderRadius: 20,
  },
  todayButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
}); 