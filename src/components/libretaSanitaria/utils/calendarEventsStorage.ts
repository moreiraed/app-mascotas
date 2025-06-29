import AsyncStorage from '@react-native-async-storage/async-storage';
import { CalendarEvent } from '../types/calendarEvent.types';

const EVENTS_KEY_PREFIX = 'calendar_events_';

export const getEventsForPet = async (petId: string): Promise<CalendarEvent[]> => {
  const data = await AsyncStorage.getItem(EVENTS_KEY_PREFIX + petId);
  return data ? JSON.parse(data) : [];
};

export const saveEventsForPet = async (petId: string, events: CalendarEvent[]) => {
  await AsyncStorage.setItem(EVENTS_KEY_PREFIX + petId, JSON.stringify(events));
};

export const addEventForPet = async (petId: string, event: CalendarEvent) => {
  const events = await getEventsForPet(petId);
  events.push(event);
  await saveEventsForPet(petId, events);
};

export const removeEventForPet = async (petId: string, eventId: string) => {
  const events = await getEventsForPet(petId);
  const filtered = events.filter(e => e.id !== eventId);
  await saveEventsForPet(petId, filtered);
};

export const updateEventForPet = async (petId: string, updatedEvent: CalendarEvent) => {
  const events = await getEventsForPet(petId);
  const updated = events.map(e => e.id === updatedEvent.id ? updatedEvent : e);
  await saveEventsForPet(petId, updated);
}; 