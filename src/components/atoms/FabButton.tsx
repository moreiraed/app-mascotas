import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface FabButtonProps {
  onPress: () => void;
  iconName: keyof typeof MaterialIcons.glyphMap;
  backgroundColor?: string;
  iconColor?: string;
  style?: ViewStyle;
  size?: number;
}

const FabButton: React.FC<FabButtonProps> = ({
  onPress,
  iconName,
  backgroundColor = '#FF9F00',
  iconColor = '#fff',
  style = {},
  size = 56,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.fab,
        { backgroundColor, width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <MaterialIcons name={iconName} size={size * 0.57} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default FabButton; 