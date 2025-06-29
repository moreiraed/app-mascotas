export type CalendarEventType = 'vacuna' | 'desparasitacion' | 'control' | 'estudio' | 'personalizado';

export interface CalendarEvent {
  id: string; // UUID
  petId: string;
  date: string; // 'YYYY-MM-DD'
  type: CalendarEventType;
  title: string;
  description?: string;
  relatedId?: string; // id del registro en la libreta sanitaria, si aplica
} 