import AsyncStorage from '@react-native-async-storage/async-storage';
import { Vaccine, Deworming, Control, Study } from '../types/libretaSanitaria.types';

export const getStorageKey = (userId: string, petId: string, type: string): string => {
  return `${type}_${userId}_${petId}`;
};

export const loadData = async <T>(key: string): Promise<T[]> => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error loading data for key ${key}:`, error);
    return [];
  }
};

export const saveData = async <T>(key: string, data: T[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data for key ${key}:`, error);
    throw error;
  }
};

export const loadVaccines = async (userId: string, petId: string): Promise<Vaccine[]> => {
  try {
    const vaccinesData = await AsyncStorage.getItem(`vaccines_${userId}_${petId}`);
    return vaccinesData ? JSON.parse(vaccinesData) : [];
  } catch (error) {
    console.error('Error loading vaccines:', error);
    return [];
  }
};

export const loadDewormings = async (userId: string, petId: string): Promise<Deworming[]> => {
  try {
    const dewormingsData = await AsyncStorage.getItem(`dewormings_${userId}_${petId}`);
    return dewormingsData ? JSON.parse(dewormingsData) : [];
  } catch (error) {
    console.error('Error loading dewormings:', error);
    return [];
  }
};

export const loadControls = async (userId: string, petId: string): Promise<Control[]> => {
  try {
    const controlsData = await AsyncStorage.getItem(`controls_${userId}_${petId}`);
    return controlsData ? JSON.parse(controlsData) : [];
  } catch (error) {
    console.error('Error loading controls:', error);
    return [];
  }
};

export const loadStudies = async (userId: string, petId: string): Promise<Study[]> => {
  try {
    const studiesData = await AsyncStorage.getItem(`studies_${userId}_${petId}`);
    return studiesData ? JSON.parse(studiesData) : [];
  } catch (error) {
    console.error('Error loading studies:', error);
    return [];
  }
};

export const saveVaccines = async (userId: string, petId: string, vaccines: Vaccine[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(`vaccines_${userId}_${petId}`, JSON.stringify(vaccines));
  } catch (error) {
    console.error('Error saving vaccines:', error);
    throw error;
  }
};

export const saveDewormings = async (userId: string, petId: string, dewormings: Deworming[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(`dewormings_${userId}_${petId}`, JSON.stringify(dewormings));
  } catch (error) {
    console.error('Error saving dewormings:', error);
    throw error;
  }
};

export const saveControls = async (userId: string, petId: string, controls: Control[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(`controls_${userId}_${petId}`, JSON.stringify(controls));
  } catch (error) {
    console.error('Error saving controls:', error);
    throw error;
  }
};

export const saveStudies = async (userId: string, petId: string, studies: Study[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(`studies_${userId}_${petId}`, JSON.stringify(studies));
  } catch (error) {
    console.error('Error saving studies:', error);
    throw error;
  }
}; 