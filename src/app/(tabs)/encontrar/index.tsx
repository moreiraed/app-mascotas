import { FlatList, View, StyleSheet } from 'react-native';
import { LostPetCard } from '@/src/components/LostPetCard';
import lostPets from '@/src/constants/lostPets';

const Encontrar = () => {
  // Función para manejar favoritos
  const handleFavoritePress = (petId: string) => {
    console.log('Toggle favorite:', petId);
    // Aquí deberías actualizar el estado de favoritos
    // Ejemplo con un estado local o llamada a tu store/API
  };

  // Función para manejar el menú de opciones
  const handleMorePress = (petId: string) => {
    console.log('Mostrar opciones para:', petId);
    // Aquí podrías mostrar un ActionSheet o similar
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={lostPets}
        renderItem={({ item }) => (
          <LostPetCard 
            pet={item} 
            onDetailsPress={() => console.log('Ver detalles', item.id)}
            onFavoritePress={handleFavoritePress}
            onMorePress={handleMorePress}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  separator: {
    height: 12,
  },
});

export default Encontrar;