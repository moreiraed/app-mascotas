import { FlatList, View } from 'react-native';
import { LostPetCard } from '@/src/components/LostPetCard';
import lostPets from '@/src/constants/lostPets';

const Encontrar = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5'}}>
      <FlatList
        data={lostPets}
        renderItem={({ item }) => (
          <LostPetCard 
            pet={item} 
            onPress={() => console.log('Ver detalles', item.id)} 
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default Encontrar