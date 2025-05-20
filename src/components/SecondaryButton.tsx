import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../styles/components/secondaryButtonStyles';

type ButtonProps = {
  title: string;
  onPress?: () => void; // Función onPress opcional
};

const SecondaryButtonLong = (props: ButtonProps) => {
  return (
    <View style={styles.containerLong}>
      <TouchableOpacity style={styles.button} onPress={props.onPress} >
        <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SecondaryButtonLong