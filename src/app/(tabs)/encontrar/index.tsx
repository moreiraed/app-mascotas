// app/(tabs)/encontrar/index.tsx
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { LostPetCard } from '@/src/components/LostPetCard';
import { usePets } from '@/src/contexts/PetsContext';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import FabButton from '@/src/components/atoms/FabButton';

const Encontrar = () => {
  const { lostPets, loading, refreshPets } = usePets();
  const router = useRouter();

  useEffect(() => {
    refreshPets();
  }, []);

  const handleFavoritePress = (petId: string) => {
    console.log('Toggle favorite:', petId);
  };

  const handleDetailsPress = (petId: string) => {
    router.push(`/encontrar/${petId}`);
  };

  const handleCreatePress = () => {
    router.push('/encontrar/create');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={lostPets}
        renderItem={({ item }) => (
          <LostPetCard 
            pet={item} 
            onDetailsPress={() => handleDetailsPress(item.id)}
            onFavoritePress={handleFavoritePress}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <FabButton 
        onPress={handleCreatePress}
        iconName="add"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    position: 'relative',
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