import { View, FlatList, Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import HiloItem from '@/src/components/HiloItem';
import { useForo } from '@/src/contexts/ForoContext';

export default function ForoScreen() {
  const router = useRouter();
  const { hilos, estaCargando, actualizarHilos } = useForo();
  const [refreshing, setRefreshing] = useState(false);

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
        data={hilos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HiloItem hilo={item} />}
        ListEmptyComponent={
          <View style={styles.centrado}>
            <Text>No hay hilos aún. ¡Sé el primero en crear uno!</Text>
          </View>
        }
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
      
      <Pressable style={styles.botonFlotante} onPress={navigateToCreate}>
        <Text style={styles.textoBoton}>+</Text>
      </Pressable>
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