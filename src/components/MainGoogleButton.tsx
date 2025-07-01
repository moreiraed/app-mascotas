import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../styles/components/googleButtonStyle';
import { FontAwesome5 } from '@expo/vector-icons';
import colors from '../constants/colors';

type ButtonProps = {
  title: string;
  onPress?: () => void; // Función onPress opcional
};

const MainGoogleButton = (props: ButtonProps) => {
  return (
    <View style={styles.containerLong}>
      <TouchableOpacity style={styles.button} onPress={props.onPress} >
        <FontAwesome5 name="google" size={24} color={colors.textPrimary} style={styles.icon} />
        <Text style={[styles.text, { flex: 1, textAlign: 'center' }]}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainGoogleButton;