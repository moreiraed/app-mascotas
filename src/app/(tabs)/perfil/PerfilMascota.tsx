import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { perfilMascotaStyles } from '../../../styles/perfilMascotasStyles';
import imagePath from '@/src/constants/imagePath';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function PerfilMascota() {
  const [selected, setSelected] = useState('');
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();
  const imagePathMap = imagePath as Record<string, any>;

  // Determina el source de la imagen correctamente
  let imageSource;
  if (
    params.imagen &&
    typeof params.imagen === 'string' &&
    (params.imagen.startsWith('http') || params.imagen.startsWith('file')) &&
    params.imagen.length > 10
  ) {
    imageSource = { uri: params.imagen.trim() };
  } else if (params.imagen && imagePathMap[params.imagen as string]) {
    imageSource = imagePathMap[params.imagen as string];
  } else {
    imageSource = imagePath.cat01;
  }
  

  // Datos de la mascota seleccionada o valores por defecto
  const petData = {
    name: params.nombre || 'Sin nombre',
    sex: params.sexo || 'Desconocido',
    color: params.color || 'Desconocido',
    age: params.edad || 'Desconocida',
    peso: params.peso || 'Desconocido',
  };

  const toggleCalendar = () => {
    setIsCalendarExpanded(!isCalendarExpanded);
  };

  return (
    <ScrollView style={perfilMascotaStyles.container}>
      {/* Botón de volver */}
      <View style={{ position: 'absolute', top: 40, left: 5, zIndex: 20, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/perfil')} style={{ padding: 4, backgroundColor: '#fff', borderRadius: 20, elevation: 2 }}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      {/* Botón de editar */}
      <View style={{ position: 'absolute', top: 40, right: 20, zIndex: 20 }}>
        <TouchableOpacity
          onPress={() => router.push({
            pathname: '/(tabs)/perfil/editarMascota',
            params: {
              id: params.id,
              nombre: petData.name,
              imagen: params.imagen,
              sexo: petData.sex,
              color: petData.color,
              edad: petData.age,
              peso: petData.peso,
            }
          })}
          style={{ padding: 4, backgroundColor: '#fff', borderRadius: 20, elevation: 2 }}
        >
          <MaterialIcons name="edit" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      {/* Imagen grande de la mascota */}
      <View style={perfilMascotaStyles.petImageContainer}>
        <Image 
          source={imageSource} 
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

        {/* Calendario y Botón Libreta Sanitaria en fila si está contraído */}
        {isCalendarExpanded ? (
          <>
            <View style={[
              perfilMascotaStyles.calendarContainerExpanded
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
            {/* Botón debajo si expandido */}
            <TouchableOpacity
              style={[
                perfilMascotaStyles.libretaButton,
                isCalendarExpanded && { marginTop: 20 }
              ]}
              onPress={() => router.push({
                pathname: '/(tabs)/perfil/libretaSanitaria',
                params: {
                  id: params.id,
                  nombre: petData.name,
                  imagen: params.imagen,
                  sexo: petData.sex,
                  color: petData.color,
                  edad: petData.age,
                  peso: petData.peso,
                }
              })}
            >
              <Text style={perfilMascotaStyles.libretaButtonText}>Libreta Sanitaria</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={perfilMascotaStyles.rowContainer}>
            <View style={perfilMascotaStyles.calendarContainerSmall}>
              <Text style={perfilMascotaStyles.calendarTitle}>Calendario de Eventos</Text>
              <TouchableOpacity 
                style={perfilMascotaStyles.expandButton}
                onPress={toggleCalendar}
              >
                <Text style={perfilMascotaStyles.expandButtonText}>+</Text>
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
              {!isCalendarExpanded && (
                <TouchableOpacity 
                  style={perfilMascotaStyles.calendarOverlay}
                  onPress={toggleCalendar}
                >
                  <Text style={perfilMascotaStyles.overlayText}>Toca para expandir</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={perfilMascotaStyles.libretaButton}
              onPress={() => router.push({
                pathname: '/(tabs)/perfil/libretaSanitaria',
                params: {
                  id: params.id,
                  nombre: petData.name,
                  imagen: params.imagen,
                  sexo: petData.sex,
                  color: petData.color,
                  edad: petData.age,
                  peso: petData.peso,
                }
              })}
            >
              <Text style={perfilMascotaStyles.libretaButtonText}>Libreta Sanitaria</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
} 