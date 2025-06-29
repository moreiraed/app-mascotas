import { View, FlatList, Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import HiloItem from '@/src/components/HiloItem';
import { useForo } from '@/src/contexts/ForoContext';
import { useNavigation } from 'expo-router';
import { Hilo } from '@/src/types/tipos';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import FabButton from '@/src/components/atoms/FabButton';

export default function ForoScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { hilos, estaCargando, actualizarHilos } = useForo();
  const [refreshing, setRefreshing] = useState(false);
  const [hilosFiltrados, setHilosFiltrados] = useState<Hilo[]>([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  useEffect(() => {
    if (terminoBusqueda) {
      const filtrados = hilos.filter(hilo => 
        hilo.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        hilo.contenido.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        hilo.autor.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
      );
      setHilosFiltrados(filtrados);
    } else {
      setHilosFiltrados(hilos);
    }
  }, [terminoBusqueda, hilos]);

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: 'Buscar hilos...',
        onChangeText: (event: NativeSyntheticEvent<TextInputChangeEventData>) => 
          setTerminoBusqueda(event.nativeEvent.text),
        onCancelButtonPress: () => setTerminoBusqueda(''),
      },
    });
  }, [navigation]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await actualizarHilos();
    setRefreshing(false);
  };

  const navigateToCreate = () => {
    router.push('/(tabs)/foro/crear-hilo');
  };

  if (estaCargando && !refreshing) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <FlatList
        data={hilosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HiloItem hilo={item} />}
        ListEmptyComponent={
          <View style={styles.centrado}>
            <Text>
              {terminoBusqueda 
                ? 'No se encontraron hilos que coincidan con tu búsqueda' 
                : 'No hay hilos aún. ¡Sé el primero en crear uno!'}
            </Text>
          </View>
        }
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      
      <FabButton
        onPress={navigateToCreate}
        iconName="add"
        backgroundColor="#FF9F00"
        iconColor="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 10,
  },
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonFlotante: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF9F00',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  textoBoton: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});