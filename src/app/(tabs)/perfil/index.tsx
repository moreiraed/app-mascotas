import React from 'react';
import { View, Text, Image, FlatList, ScrollView, Dimensions } from 'react-native';
import styles from '../../../styles/perfilStyles';

const screenWidth = Dimensions.get('window').width;

const mockImages = [
  require('../../../assets/images/inicio.png'),
  require('../../../assets/images/permisos.png'),
  require('../../../assets/images/react-logo.png'),
];


export default function PerfilScreen() {
  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      {/* Sección 1: Perfil */}
      <View style={{ width: screenWidth, ...styles.container }}>
        <View style={styles.header}>
          <Image
            source={require('../../../assets/images/cat-dog-logo.png')}
            style={styles.avatar}
          />
          <Text style={styles.username}>@usuario</Text>
        </View>

        <Text style={styles.sectionTitle}>Tus publicaciones</Text>
        <View style={styles.gallery}>
          <FlatList
            data={mockImages}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
            renderItem={({ item }) => (
              <Image source={item} style={styles.galleryImage} />
            )}
            contentContainerStyle={styles.galleryContainer}
          />
        </View>
      </View>

      {/* Sección 2: Mascotas */}
      <View style={{ width: screenWidth, ...styles.container }}>
        <Text style={styles.sectionTitle}>Tus Mascotas</Text>
        {/* Contenido de Mascotas (lo agregaremos más adelante) */}
      </View>
    </ScrollView>
  );
}