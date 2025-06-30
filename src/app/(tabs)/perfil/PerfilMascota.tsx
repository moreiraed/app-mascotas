import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, TextInput, Button, Platform } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { perfilMascotaStyles } from '../../../styles/perfilMascotasStyles';
import imagePath from '@/src/constants/imagePath';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { getEventsForPet, addEventForPet, removeEventForPet } from '@/src/components/libretaSanitaria/utils/calendarEventsStorage';
import { CalendarEvent } from '@/src/components/libretaSanitaria/types/calendarEvent.types';
import { useFocusEffect } from '@react-navigation/native';
import { parseISO, isAfter, isEqual } from 'date-fns';
import colors from '@/src/constants/colors';

export default function PerfilMascota() {
  const [selected, setSelected] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [dayEvents, setDayEvents] = useState<CalendarEvent[]>([]);
  const router = useRouter();
  const params = useLocalSearchParams();
  const imagePathMap = imagePath as Record<string, any>;
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({ date: '', type: 'personalizado', title: '' });

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

  useEffect(() => {
    if (params.id) {
      getEventsForPet(params.id as string).then(setEvents);
    }
  }, [params.id]);

  // Recarga los eventos cada vez que la pantalla recibe foco
  useFocusEffect(
    React.useCallback(() => {
      if (params.id) {
        getEventsForPet(params.id as string).then(setEvents);
      }
    }, [params.id])
  );

  useEffect(() => {
    setDayEvents(events.filter(e => e.date === selectedDate));
  }, [selectedDate, events]);

  // Marcar fechas con eventos y la fecha seleccionada
  const markedDates = events.reduce((acc, event) => {
    acc[event.date] = {
      marked: true,
      dotColor: '#FF9F00',
      ...(selectedDate === event.date && {
        selected: true,
        selectedColor: '#FF9F00',
        selectedTextColor: '#FFFFFF',
      }),
    };
    return acc;
  }, {} as any);

  // Agregar la fecha seleccionada si no tiene eventos
  if (selectedDate && !events.find(e => e.date === selectedDate)) {
    markedDates[selectedDate] = {
      selected: true,
      selectedColor: '#FF9F00',
      selectedTextColor: '#FFFFFF',
    };
  }

  // Función para abrir el modal y setear la fecha seleccionada
  const openAddEventModal = () => {
    setNewEvent({ date: selectedDate || new Date().toISOString().slice(0, 10), type: 'personalizado', title: '' });
    setModalVisible(true);
  };

  // Función para guardar el evento
  const handleSaveEvent = async () => {
    if (!params.id || !newEvent.date || !newEvent.title) return;
    const event: CalendarEvent = {
      id: Date.now().toString(),
      petId: params.id as string,
      date: newEvent.date,
      type: newEvent.type as any,
      title: newEvent.title!,
      description: newEvent.description,
    };
    await addEventForPet(params.id as string, event);
    setEvents(await getEventsForPet(params.id as string));
    setModalVisible(false);
  };

  // Función para eliminar un evento personalizado
  const handleDeleteEvent = async (eventId: string) => {
    if (!params.id) return;
    await removeEventForPet(params.id as string, eventId);
    setEvents(await getEventsForPet(params.id as string));
  };

  // Calcular el próximo evento
  const today = new Date().toISOString().slice(0, 10);
  const nextEvent = events
    .filter(e => isAfter(parseISO(e.date), parseISO(today)) || isEqual(parseISO(e.date), parseISO(today)))
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  return (
    <ScrollView style={[perfilMascotaStyles.container, { backgroundColor: colors.background }]}>
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
              {/* Botón para agregar evento SOLO cuando está expandido */}
              <TouchableOpacity 
                style={perfilMascotaStyles.expandButton}
                onPress={openAddEventModal}
              >
                <Text style={perfilMascotaStyles.expandButtonText}>+</Text>
              </TouchableOpacity>
              <Calendar
                onDayPress={(day: DateData) => {
                  setSelectedDate(day.dateString);
                }}
                markedDates={markedDates}
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
              {/* Mostrar eventos del día seleccionado SOLO cuando el calendario está expandido */}
              {dayEvents.length > 0 && (
                <View style={{ marginTop: 10 }}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Eventos del día:</Text>
                  {dayEvents.map(event => (
                    <View key={event.id} style={{ marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: 'bold' }}>{event.title}</Text>
                        {event.description ? <Text>{event.description}</Text> : null}
                        <Text style={{ fontSize: 12, color: '#888' }}>{event.type}</Text>
                      </View>
                      {/* Botón eliminar solo para eventos personalizados */}
                      {event.type === 'personalizado' && (
                        <TouchableOpacity onPress={() => handleDeleteEvent(event.id)} style={{ marginLeft: 10 }}>
                          <MaterialIcons name="delete" size={22} color={colors.primary} />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                </View>
              )}
              {/* Texto para contraer calendario */}
              <TouchableOpacity onPress={toggleCalendar} style={{ alignItems: 'center', marginTop: 16 }}>
                <Text style={{ color: '#FF9F00', fontWeight: 'bold' }}>Toca para contraer</Text>
              </TouchableOpacity>
            </View>
            {/* Próximo evento debajo del calendario expandido, fuera del contenedor del calendario */}
            {nextEvent && (
              <View style={{
                backgroundColor: '#FFF8E1',
                borderRadius: 10,
                padding: 14,
                marginTop: 16,
                marginBottom: 8,
                marginHorizontal: 0,
                borderLeftWidth: 5,
                borderLeftColor: '#FF9F00',
                alignSelf: 'stretch',
              }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Próximo evento</Text>
                <Text style={{ fontSize: 15, marginTop: 2 }}>{nextEvent.title}</Text>
                <Text style={{ color: '#888', fontSize: 13 }}>{nextEvent.date}</Text>
                {nextEvent.description ? <Text style={{ marginTop: 2 }}>{nextEvent.description}</Text> : null}
              </View>
            )}
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
            {/* Modal para crear evento */}
            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '85%' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Nuevo Evento</Text>
                  <Text style={{ marginBottom: 4 }}>Fecha (YYYY-MM-DD):</Text>
                  <TextInput
                    value={newEvent.date}
                    onChangeText={text => setNewEvent(ev => ({ ...ev, date: text }))}
                    placeholder="YYYY-MM-DD"
                    style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginBottom: 8, padding: Platform.OS === 'ios' ? 12 : 8 }}
                  />
                  <Text style={{ marginBottom: 4 }}>Título:</Text>
                  <TextInput
                    value={newEvent.title}
                    onChangeText={text => setNewEvent(ev => ({ ...ev, title: text }))}
                    placeholder="Título del evento"
                    style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginBottom: 8, padding: Platform.OS === 'ios' ? 12 : 8 }}
                  />
                  <Text style={{ marginBottom: 4 }}>Descripción (opcional):</Text>
                  <TextInput
                    value={newEvent.description}
                    onChangeText={text => setNewEvent(ev => ({ ...ev, description: text }))}
                    placeholder="Descripción"
                    style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginBottom: 8, padding: Platform.OS === 'ios' ? 12 : 8 }}
                  />
                  <Text style={{ marginBottom: 4 }}>Tipo:</Text>
                  <TextInput
                    value={newEvent.type}
                    onChangeText={text => setNewEvent(ev => ({ ...ev, type: text as any }))}
                    placeholder="personalizado, vacuna, control, etc."
                    style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginBottom: 12, padding: Platform.OS === 'ios' ? 12 : 8 }}
                  />
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#888" />
                    <View style={{ width: 12 }} />
                    <Button title="Guardar" onPress={handleSaveEvent} color="#FF9F00" />
                  </View>
                </View>
              </View>
            </Modal>
          </>
        ) : (
          <>
            <View style={perfilMascotaStyles.rowContainer}>
              <View style={perfilMascotaStyles.calendarContainerSmall}>
                <Text style={perfilMascotaStyles.calendarTitle}>Calendario de Eventos</Text>
                <Calendar
                  onDayPress={(day: DateData) => {
                    setSelectedDate(day.dateString);
                  }}
                  markedDates={markedDates}
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
            {/* Próximo evento debajo del calendario contraído, fuera del rowContainer */}
            {nextEvent && (
              <View style={{
                backgroundColor: '#FFF8E1',
                borderRadius: 10,
                padding: 14,
                marginTop: 16,
                marginBottom: 8,
                marginHorizontal: 0,
                borderLeftWidth: 5,
                borderLeftColor: '#FF9F00',
                alignSelf: 'stretch',
              }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Próximo evento</Text>
                <Text style={{ fontSize: 15, marginTop: 2 }}>{nextEvent.title}</Text>
                <Text style={{ color: '#888', fontSize: 13 }}>{nextEvent.date}</Text>
                {nextEvent.description ? <Text style={{ marginTop: 2 }}>{nextEvent.description}</Text> : null}
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
} 