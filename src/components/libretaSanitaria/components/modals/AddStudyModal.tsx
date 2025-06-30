import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BaseModal } from './BaseModal';
import { Calendar } from 'react-native-calendars';
import colors from '@/src/constants/colors';

interface AddStudyModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (type: string, date: Date) => void;
}

export const AddStudyModal: React.FC<AddStudyModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [type, setType] = useState('');
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(date.toISOString().slice(0, 10));

  const handleSave = () => {
    if (!type.trim()) {
      Alert.alert(
        'Campo obligatorio',
        'Por favor, ingresa el tipo de estudio.',
        [{ text: 'Entendido', style: 'default' }]
      );
      return;
    }
    
    onSave(type.trim(), date);
    setType('');
    setDate(new Date());
  };

  const changeDate = (days: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  };

  const setToday = () => {
    setDate(new Date());
  };

  const handleDayPress = (day) => {
    setDate(new Date(day.dateString));
    setSelectedDate(day.dateString);
  };

  return (
    <BaseModal
      visible={visible}
      title="Agregar Estudio"
      onClose={onClose}
      onSave={handleSave}
    >
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Tipo de Estudio</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Ej: Análisis de sangre, Radiografía, Ecografía, etc."
          value={type}
          onChangeText={setType}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Fecha del Estudio</Text>
        <View style={{ marginVertical: 8 }}>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: colors.primary,
              }
            }}
            theme={{
              selectedDayBackgroundColor: colors.primary,
              todayTextColor: colors.primary,
              arrowColor: colors.primary,
            }}
          />
        </View>
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