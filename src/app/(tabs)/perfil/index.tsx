import React, { useState } from 'react';
import { View, Text, Image, FlatList, useWindowDimensions, ImageBackground, TouchableOpacity, Modal, Pressable } from 'react-native';
import { TabView, SceneMap, TabBar} from 'react-native-tab-view';
import styles from '../../../styles/perfilStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const publicaciones = [
  require('../../../assets/images/pets/dogs/dog01.png'),
  require('../../../assets/images/pets/dogs/dog02.jpg'),
  require('../../../assets/images/pets/dogs/dog03.jpg'),
  require('../../../assets/images/pets/dogs/dog04.jpg'),
  require('../../../assets/images/pets/dogs/dog05.jpg'),
  require('../../../assets/images/pets/cats/cat01.jpg'),
  require('../../../assets/images/pets/cats/cat02.jpeg'),
  require('../../../assets/images/pets/cats/cat03.jpg'),
  require('../../../assets/images/pets/cats/cat04.jpg'),
  require('../../../assets/images/pets/cats/cat05.jpg'),
  
];

const mascotas = [
  { imagen: require('../../../assets/images/pets/cats/cat01.jpg'), nombre: 'Michi' },
  { imagen: require('../../../assets/images/pets/dogs/dog01.png'), nombre: 'Max' },
  { imagen: require('../../../assets/images/pets/cats/cat03.jpg'), nombre: 'blacky' },
  { imagen: require('../../../assets/images/pets/cats/cat05.jpg'), nombre: 'Rocky' },
  { imagen: require('../../../assets/images/pets/dogs/dog03.jpg'), nombre: 'firu' },
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

const MascotasRoute = () => {
  const router = useRouter();
  return (
    <FlatList
      data={mascotas}
      numColumns={3}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => router.push('/(tabs)/perfil/PerfilMascota')}>
          <View style={styles.mascotaItem}>
            <Image source={item.imagen} style={styles.mascotaImagen} resizeMode="cover" />
            <View style={styles.mascotaTextoContenedor}>
              <Text style={styles.mascotaNombre}>{item.nombre}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.mascotasLista}
    />
  );
};

const renderScene = SceneMap({
  publicaciones: PublicacionesRoute,
  mascotas: MascotasRoute,
});

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    style={styles.tabBar}
    indicatorStyle={styles.indicator}
    renderLabel={({ route, focused, color }: { route: { key: string; title: string }; focused: boolean; color: string }) => (
      <Text style={[styles.tabLabel, focused && styles.tabLabelFocused, { color }]}>
        {route.title}
      </Text>
    )}
  />
);

export default function PerfilScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'publicaciones', title: 'Publicaciones' },
    { key: 'mascotas', title: 'Mascotas' },
  ]);
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const handleEditarPerfil = () => {
    closeMenu();
    // Aquí puedes navegar a la pantalla de edición o abrir un modal
    // Por ahora solo cierra el menú
  };

  return (
    <View style={styles.container}>
      {/* Botón de menú en la esquina superior derecha */}
      <View style={{ position: 'absolute', top: 40, right: 20, zIndex: 10 }}>
        <TouchableOpacity onPress={openMenu} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <MaterialIcons name="more-vert" size={28} color="#333" />
        </TouchableOpacity>
      </View>
      {/* Menú modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <Pressable style={styles.menuOverlay} onPress={closeMenu}>
          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={handleEditarPerfil} style={styles.menuItem}>
              <Text style={styles.menuItemText}>Editar perfil</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
     
      <View style={styles.profileContainer}>
        <Image
          source={require('../../../assets/images/pets/dogs/golden.jpg')}
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
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

