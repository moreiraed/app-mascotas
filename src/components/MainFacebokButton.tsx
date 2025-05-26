import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../styles/components/facebookButtonSyles';
import { FontAwesome5 } from '@expo/vector-icons';

type ButtonProps = {
  title: string;
  onPress?: () => void; // Función onPress opcional
};

const MainFacebokButton = (props: ButtonProps) => {
  return (
    <View style={styles.containerLong}>
      <TouchableOpacity style={styles.button} onPress={props.onPress} >
        <FontAwesome5 name="facebook" size={24} color="white" style={styles.icon} />
        <Text style={[styles.text, { flex: 1, textAlign: 'center' }]}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainFacebokButton;