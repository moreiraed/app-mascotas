export type TabType = 'vacunas' | 'estudios' | 'desparasitaciones' | 'controles';

export interface PetData {
  id: string;
  name: string;
  sex: string;
  color: string;
  age: string;
  weight: string;
  image: string;
}

export interface Vaccine {
  id: string;
  type: string;
  date: string;
  createdAt: string;
}

export interface Deworming {
  id: string;
  type: string;
  date: string;
  createdAt: string;
}

export interface Control {
  id: string;
  type: string;
  date: string;
  weight: string;
  diagnosis: string;
  treatment: string;
  createdAt: string;
}

export interface Study {
  id: string;
  type: string;
  date: string;
  createdAt: string;
}

export interface NewVaccine {
  type: string;
  date: Date;
}

export interface NewDeworming {
  type: string;
  date: Date;
}

export interface NewControl {
  type: string;
  date: Date;
  weight: string;
  diagnosis: string;
  treatment: string;
}

export interface NewStudy {
  type: string;
  date: Date;
} 