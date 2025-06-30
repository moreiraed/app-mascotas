import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, useWindowDimensions, ImageBackground, TouchableOpacity, Modal, Pressable, TextInput, Alert } from 'react-native';
import { TabView, SceneMap, TabBar} from 'react-native-tab-view';
import styles from '../../../styles/perfilStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import imagePath from '@/src/constants/imagePath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutButton from '@/src/components/molecules/LogoutButton';
import { useAuth } from '@/src/hooks/useAuth';
import colors from '@/src/constants/colors';
import FabButton from '@/src/components/atoms/FabButton';



const publicaciones = [
  imagePath.dog01,
  imagePath.dog02,
  imagePath.dog03,
  imagePath.dog04,
  imagePath.dog05,
  imagePath.cat01,
  imagePath.cat02,
  imagePath.cat03,
  imagePath.cat04,
  imagePath.cat05,
  
];

export default function PerfilScreen() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'publicaciones', title: 'Publicaciones' },
    { key: 'mascotas', title: 'Mascotas' },
  ]);
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();
  const [username, setUsername] = useState('@Nombre_usuario');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [mascotas, setMascotas] = useState<any[]>([]);
  const { currentUserId } = useAuth();

  useEffect(() => {
    const loadMascotas = async () => {
      if (!currentUserId) return;
      
      const mascotasRaw = await AsyncStorage.getItem(`mascotas_${currentUserId}`);
      setMascotas(mascotasRaw ? JSON.parse(mascotasRaw) : []);
    };
    // Recarga cuando la pantalla obtiene foco
    if (router && (router as any).addListener) {
      const unsubscribe = (router as any).addListener('focus', loadMascotas);
      loadMascotas();
      return unsubscribe;
    } else {
      loadMascotas();
    }
  }, [router, currentUserId]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (!currentUserId) return;
        
        const value = await AsyncStorage.getItem(`username_${currentUserId}`);
        if (value !== null) {
          setUsername(value);
        }
        const uri = await AsyncStorage.getItem(`profileImage_${currentUserId}`);
        if (uri) setProfileImage(uri);
        else setProfileImage(null);
      } catch (e) {
        // Manejar error
      }
    };
    loadProfile();
  }, [currentUserId]);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const handleEditarPerfil = () => {
    closeMenu();
    router.push('/(tabs)/perfil/editarPerfil');
  };

  const agregarMascota = () => {
    router.push({ pathname: '/(tabs)/perfil/editarMascota' });
  };

  const eliminarMascota = async (id: string) => {
    if (!currentUserId) return;
    Alert.alert(
      'Eliminar mascota',
      '¿Estás seguro de que quieres eliminar esta mascota?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar', style: 'destructive', onPress: async () => {
            const mascotasRaw = await AsyncStorage.getItem(`mascotas_${currentUserId}`);
            let mascotas = mascotasRaw ? JSON.parse(mascotasRaw) : [];
            mascotas = mascotas.filter((m: any) => m.id !== id);
            await AsyncStorage.setItem(`mascotas_${currentUserId}`, JSON.stringify(mascotas));
            setMascotas(mascotas);
          }
        }
      ]
    );
  };

  const MascotasRoute = () => {
    const router = useRouter();
    const imagePathMap = imagePath as Record<string, any>;
    return (
      <FlatList
        data={mascotas}
        numColumns={3}
        keyExtractor={(item, index) => item.id || item.nombre || index.toString()}
        renderItem={({ item }) => (
          <View style={styles.mascotaItem}>
            <TouchableOpacity
              style={{ position: 'absolute', top: 4, right: 4, zIndex: 2 }}
              onPress={() => eliminarMascota(item.id)}
            >
              <MaterialIcons name="delete" size={22} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => router.push({
                pathname: '/(tabs)/perfil/PerfilMascota',
                params: {
                  id: item.id,
                  nombre: item.nombre,
                  imagen: item.imagen,
                  sexo: item.sexo,
                  color: item.color,
                  edad: item.edad,
                  peso: item.peso,
                }
              })}
              onLongPress={() => router.push({
                pathname: '/(tabs)/perfil/editarMascota',
                params: {
                  id: item.id,
                  nombre: item.nombre,
                  imagen: item.imagen,
                  sexo: item.sexo,
                  color: item.color,
                  edad: item.edad,
                  peso: item.peso,
                }
              })}
            >
              <Image
                source={
                  item.imagen && typeof item.imagen === 'string' && (item.imagen.startsWith('http') || item.imagen.startsWith('file'))
                    ? { uri: item.imagen }
                    : imagePathMap[item.imagen] || imagePath.cat01
                }
                style={styles.mascotaImagen}
                resizeMode="cover"
              />
              <View style={styles.mascotaTextoContenedor}>
                <Text style={styles.mascotaNombre}>{item.nombre}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.mascotasLista}
      />
    );
  };

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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
            <TouchableOpacity onPress={handleEditarPerfil} style={[styles.menuItem, { width: '100%', alignSelf: 'stretch' }]}>
              <Text style={styles.menuItemText}>Editar perfil</Text>
            </TouchableOpacity>
            <View style={styles.menuItemSeparator} />
            <LogoutButton style={{ width: '100%', alignSelf: 'stretch' }} />
          </View>
        </Pressable>
      </Modal>
     
      <View style={styles.profileContainer}>
        <Image
          source={profileImage ? { uri: profileImage } : require('@/src/assets/images/icon.png')}
          style={styles.avatar}
        />
      </View>
      <View> 
         <Text style={styles.username}>{username}</Text>
      </View>
      <TabView 
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
      {/* Botón flotante para agregar mascota solo en la sección 'mascotas' */}
      {routes[index].key === 'mascotas' && (
        <FabButton
          onPress={agregarMascota}
          iconName="add"
          backgroundColor="#FF9F00"
          iconColor="#fff"
        />
      )}
    </View>
  );
}

