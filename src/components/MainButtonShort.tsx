import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../styles/components/mainButtonStyles';

type ButtonProps = {
  title: string;
  onPress?: () => void; // Función onPress opcional
};

const MainButtonShort = (props: ButtonProps) => {
  return (
    <View style={styles.containerShort}>
      <TouchableOpacity style={styles.button} onPress={props.onPress} >
        <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainButtonShort;