import React, { createContext, useContext, useState, useEffect } from 'react';
import { obtenerDatosForo } from '@/src/utils/almacen';
import { ForoState, Hilo } from '@/src/types/tipos';
import { useForoSync } from '@/src/hooks/useForoSync';

type ContextoForoType = {
  hilos: Hilo[];
  estaCargando: boolean;
  actualizarHilos: () => Promise<void>;
  agregarHilo: (nuevoHilo: Hilo) => void;
};

const ContextoForo = createContext<ContextoForoType>({
  hilos: [],
  estaCargando: true,
  actualizarHilos: async () => {},
  agregarHilo: () => {},
});

export const useForo = () => useContext(ContextoForo);

export const ProveedorForo = ({ children }: { children: React.ReactNode }) => {
  const [listaHilos, setListaHilos] = useState<Hilo[]>([]);
  const [estaCargando, setEstaCargando] = useState(true);
  
  // Sincronizamos el usuario actual con los datos del foro
  useForoSync();

  // Actualiza la lista de hilos desde el almacenamiento local
  const actualizarHilos = async () => {
    try {
      setEstaCargando(true);
      const datosForo: ForoState = await obtenerDatosForo();
      setListaHilos(datosForo.hilos);
    } catch (error) {
      console.error('Error al actualizar hilos:', error);
    } finally {
      setEstaCargando(false);
    }
  };

  // Agrega un nuevo hilo al estado local
  const agregarHilo = (nuevoHilo: Hilo) => {
    setListaHilos(hilosPrevios => [nuevoHilo, ...hilosPrevios]);
  };

  // Cargamos los hilos al montar el componente
  useEffect(() => {
    actualizarHilos();
  }, []);

  return (
    <ContextoForo.Provider 
      value={{
        hilos: listaHilos,
        estaCargando,
        actualizarHilos,
        agregarHilo
      }}
    >
      {children}
    </ContextoForo.Provider>
  );
};