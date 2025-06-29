import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/src/hooks/useAuth';
import { TabType, PetData } from '@/src/components/libretaSanitaria/types/libretaSanitaria.types';
import { PetInfoCard } from '@/src/components/libretaSanitaria/components/PetInfoCard';
import { TabNavigation } from '@/src/components/libretaSanitaria/components/TabNavigation';
import { VacunasSection } from '@/src/components/libretaSanitaria/components/sections/VacunasSection';
import { DesparasitacionesSection } from '@/src/components/libretaSanitaria/components/sections/DesparasitacionesSection';
import { ControlesSection } from '@/src/components/libretaSanitaria/components/sections/ControlesSection';
import { EstudiosSection } from '@/src/components/libretaSanitaria/components/sections/EstudiosSection';
import { libretaSanitariaStyles } from '@/src/components/libretaSanitaria/styles/libretaSanitariaStyles';

export default function LibretaSanitaria() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { currentUserId } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('vacunas');

  // Datos de la mascota
  const petData: PetData = {
    id: params.id as string,
    name: (params.nombre as string) || 'Sin nombre',
    sex: (params.sexo as string) || 'Desconocido',
    color: (params.color as string) || 'Desconocido',
    age: (params.edad as string) || 'Desconocida',
    weight: (params.peso as string) || 'Desconocido',
    image: params.imagen as string,
  };

  const renderActiveSection = () => {
    if (!currentUserId || !petData.id) return null;

    switch (activeTab) {
      case 'vacunas':
        return (
          <VacunasSection
            userId={currentUserId}
            petId={petData.id}
            petData={petData}
          />
        );
      case 'desparasitaciones':
        return (
          <DesparasitacionesSection
            userId={currentUserId}
            petId={petData.id}
            petData={petData}
          />
        );
      case 'controles':
        return (
          <ControlesSection
            userId={currentUserId}
            petId={petData.id}
            petData={petData}
          />
        );
      case 'estudios':
        return (
          <EstudiosSection
            userId={currentUserId}
            petId={petData.id}
            petData={petData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={libretaSanitariaStyles.container}>
      {/* Header con botón de volver */}
      <View style={libretaSanitariaStyles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={libretaSanitariaStyles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={libretaSanitariaStyles.headerTitle}>Libreta Sanitaria</Text>
        <View style={libretaSanitariaStyles.placeholder} />
      </View>

      <ScrollView style={libretaSanitariaStyles.content}>
        {/* Información de la mascota */}
        <PetInfoCard petData={petData} />

        {/* Tabs de navegación */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Contenido de las secciones */}
        {renderActiveSection()}
      </ScrollView>
    </View>
  );
} 