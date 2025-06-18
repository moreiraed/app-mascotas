import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { perfilMascotaStyles } from '../../../styles/perfilMascotasSyles';

export default function PerfilMascota() {
  const [selected, setSelected] = useState('');
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);

  // Datos de ejemplo de la mascota
  const petData = {
    name: 'Luna',
    image: require('../../../assets/images/pets/cats/cat01.jpg'),
    sex: 'Hembra',
    color: 'Gris',
    age: '3 años',
    peso: '3 kg',
  };

  const toggleCalendar = () => {
    setIsCalendarExpanded(!isCalendarExpanded);
  };

  return (
    <ScrollView style={perfilMascotaStyles.container}>
      {/* Imagen grande de la mascota */}
      <View style={perfilMascotaStyles.petImageContainer}>
        <Image 
          source={petData.image} 
          style={perfilMascotaStyles.petImage}
        />
      </View>

      {/* Caja contenedora con nombre, datos y calendario */}
      <View style={perfilMascotaStyles.contentBox}>
        {/* Nombre de la mascota */}
        <View style={perfilMascotaStyles.petNameContainer}>
          <Text style={perfilMascotaStyles.petName}>{petData.name}</Text>
        </View>

        {/* Datos de la mascota */}
        <View style={perfilMascotaStyles.petInfoContainer}>
          <View style={perfilMascotaStyles.infoItem}>
            <Text style={perfilMascotaStyles.infoLabel}>Sexo</Text>
            <Text style={perfilMascotaStyles.infoValue}>{petData.sex}</Text>
          </View>
          
          <View style={perfilMascotaStyles.infoItem}>
            <Text style={perfilMascotaStyles.infoLabel}>Color</Text>
            <Text style={perfilMascotaStyles.infoValue}>{petData.color}</Text>
          </View>
          
          <View style={perfilMascotaStyles.infoItem}>
            <Text style={perfilMascotaStyles.infoLabel}>Edad</Text>
            <Text style={perfilMascotaStyles.infoValue}>{petData.age}</Text>
          </View>
          <View style={perfilMascotaStyles.infoItem}>
            <Text style={perfilMascotaStyles.infoLabel}>Peso</Text>
            <Text style={perfilMascotaStyles.infoValue}>{petData.peso}</Text>
          </View>
        </View>

        {/* Calendario */}
        <View style={[
          isCalendarExpanded 
            ? perfilMascotaStyles.calendarContainerExpanded 
            : perfilMascotaStyles.calendarContainerSmall
        ]}>
          <Text style={perfilMascotaStyles.calendarTitle}>Calendario de Eventos</Text>
          
          {/* Botón para expandir/contraer */}
          <TouchableOpacity 
            style={perfilMascotaStyles.expandButton}
            onPress={toggleCalendar}
          >
            <Text style={perfilMascotaStyles.expandButtonText}>
              {isCalendarExpanded ? '−' : '+'}
            </Text>
          </TouchableOpacity>

          <Calendar
            onDayPress={(day: DateData) => {
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: '#FF9F00',
                selectedTextColor: '#FFFFFF',
              }
            }}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#333',
              selectedDayBackgroundColor: '#FF9F00',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#FF9F00',
              dayTextColor: '#333',
              textDisabledColor: '#d9e1e8',
              dotColor: '#FF9F00',
              selectedDotColor: '#ffffff',
              arrowColor: '#FF9F00',
              monthTextColor: '#333',
              indicatorColor: '#FF9F00',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 13
            }}
          />

          {/* Overlay para el calendario pequeño */}
          {!isCalendarExpanded && (
            <TouchableOpacity 
              style={perfilMascotaStyles.calendarOverlay}
              onPress={toggleCalendar}
            >
              <Text style={perfilMascotaStyles.overlayText}>Toca para expandir</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
} 