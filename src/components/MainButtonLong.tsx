import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import styles from '../styles/components/mainButtonStyles';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
};

const MainButtonLong = (props: ButtonProps) => {
  return (
    <View style={styles.containerLong}>
      <TouchableOpacity 
        style={[
          styles.button, 
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
          <Text style={styles.text}>{props.title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MainButtonLong;