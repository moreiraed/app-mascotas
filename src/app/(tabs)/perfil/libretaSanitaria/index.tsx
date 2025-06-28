import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '@/src/constants/colors';

export default function LibretaSanitaria() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Libreta Sanitaria</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
}); 