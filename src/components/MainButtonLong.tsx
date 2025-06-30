import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import styles from '../styles/components/mainButtonStyles';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: any;
  textStyle?: any;
};

const MainButtonLong = (props: ButtonProps) => {
  return (
    <View style={[styles.containerLong, props.style && { padding: 0 }]}>
      <TouchableOpacity 
        style={[
          styles.button, 
          props.style,
          (props.loading || props.disabled) && styles.disabledButton
        ]} 
        onPress={props.onPress}
        disabled={props.loading || props.disabled}
        activeOpacity={0.7}
      >
        {props.loading ? (
          <ActivityIndicator 
            color="#fff" 
            style={styles.loadingIndicator}
            size="small"
          />
        ) : (
          <Text style={[styles.text, props.textStyle]}>{props.title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MainButtonLong;