import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BaseModal } from './BaseModal';
import { Calendar } from 'react-native-calendars';
import colors from '@/src/constants/colors';

interface AddControlModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (controlData: {
    type: string;
    date: Date;
    weight: string;
    diagnosis: string;
    treatment: string;
  }) => void;
}

export const AddControlModal: React.FC<AddControlModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [type, setType] = useState('');
  const [date, setDate] = useState(new Date());
  const [weight, setWeight] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [selectedDate, setSelectedDate] = useState(date.toISOString().slice(0, 10));

  const handleSave = () => {
    if (!type.trim()) {
      Alert.alert(
        'Campo obligatorio',
        'Por favor, ingresa el tipo de control.',
        [{ text: 'Entendido', style: 'default' }]
      );
      return;
    }

    if (!weight.trim()) {
      Alert.alert(
        'Campo obligatorio',
        'Por favor, ingresa el peso del animal.',
        [{ text: 'Entendido', style: 'default' }]
      );
      return;
    }
    
    onSave({
      type: type.trim(),
      date,
      weight: weight.trim(),
      diagnosis: diagnosis.trim(),
      treatment: treatment.trim(),
    });
    setType('');
    setDate(new Date());
    setWeight('');
    setDiagnosis('');
    setTreatment('');
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
      title="Agregar Control"
      onClose={onClose}
      onSave={handleSave}
    >
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Tipo de Control</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Ej: Control de peso, Revisión general, etc."
          value={type}
          onChangeText={setType}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Fecha de la Consulta Veterinaria</Text>
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

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Peso del Animal *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Ej: 5.2 kg"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Diagnóstico de Enfermedades o Afecciones (Opcional)</Text>
        <TextInput
          style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
          placeholder="Descripción del diagnóstico, enfermedades detectadas, etc."
          value={diagnosis}
          onChangeText={setDiagnosis}
          multiline
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Tratamientos Prescriptos (Opcional)</Text>
        <TextInput
          style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]}
          placeholder="Medicamentos, dosis, duración del tratamiento, etc."
          value={treatment}
          onChangeText={setTreatment}
          multiline
        />
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