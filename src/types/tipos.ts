export interface Usuario {
  id: string;
  nombre: string;
}

export interface Comentario {
  id: string;
  contenido: string;
  autor: Usuario;
  fecha: string;
  likes: number;
  respuestas?: Comentario[]; 
  idPadre?: string; // Para identificar comentarios padres
}

export interface Hilo {
  id: string;
  titulo: string;
  contenido: string;
  autor: Usuario;
  fecha: string;
  comentarios: Comentario[];
  etiquetas?: string[];
  likes: number;
}

export interface ForoState {
  hilos: Hilo[];
  usuarios: Usuario[];
}