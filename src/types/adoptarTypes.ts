// types/tipos.ts
export type PetType = 'Perro' | 'Gato' | 'Otro';
export type PetGender = 'Macho' | 'Hembra';
export type PetStatus = 'lost' | 'adoption';

export interface PetContact {
  name: string;
  phone: string;
  email?: string;
}

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  type: PetType;
  breed: string;
  age?: string;
  gender?: PetGender;
  color?: string;
  location: string;
  date: string;
  description: string;
  image: string;
  latitude?: number;
  longitude?: number;
  contact: PetContact;
  reward?: boolean;
  specialFeatures: string[];
  lastSeenDescription?: string;
  status: PetStatus; // 'lost' o 'adoption'
  createdAt: number; // timestamp para ordenar
  vaccinated: boolean;
  sterilized: boolean;
  size: 'Pequeño' | 'Mediano' | 'Grande';
  temperament?: string;
}