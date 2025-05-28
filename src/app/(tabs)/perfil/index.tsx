import React, { useState } from 'react';
import { View, Text, Image, FlatList, useWindowDimensions, ImageBackground } from 'react-native';
import { TabView, SceneMap, TabBar} from 'react-native-tab-view';
import styles from '../../../styles/perfilStyles';

const publicaciones = [
  require('../../../assets/images/perro.jpg'),
  require('../../../assets/images/gato gris.jpeg'),
  require('../../../assets/images/golden.jpg'),
  require('../../../assets/images/gato naranja.jpeg'),
  require('../../../assets/images/gato.jpg'),
  require('../../../assets/images/perro.jpg'),
  require('../../../assets/images/gato gris.jpeg'),
  require('../../../assets/images/golden.jpg'),
  require('../../../assets/images/gato naranja.jpeg'),
  require('../../../assets/images/gato.jpg'),
  
];

const PublicacionesRoute = () => (
  <FlatList
    data={publicaciones}
    numColumns={3}
    keyExtractor={(_, index) => index.toString()}
    renderItem={({ item }) => (
      <Image source={item} style={styles.galleryImage} resizeMode="cover" />
    )}
    contentContainerStyle={styles.gallery}
  />
);

const MascotasRoute = () => (
  <View style={styles.mascotasContainer}>
    <Text style={styles.mascotasTexto}>Aquí irán las mascotas</Text>
  </View>
);

const renderScene = SceneMap({
  publicaciones: PublicacionesRoute,
  mascotas: MascotasRoute,
});

export default function PerfilScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'publicaciones', title: 'Publicaciones' },
    { key: 'mascotas', title: 'Mascotas' },
  ]);

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/images/gato gris.jpeg')}
       style={styles.cover}> </ImageBackground>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../../assets/images/golden.jpg')}
          style={styles.avatar}
        />
      </View>
      <View> 
         <Text style={styles.username}>@Nombre_usuario</Text>
      </View>
      <TabView 
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
          {...props}
          style={styles.tabBar}
          indicatorStyle={styles.indicator}
            renderLabel={({ route, focused }) => (
              <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
                {route.title}
              </Text>
            )}
          />
        )}
      />
    </View>
  );
}

