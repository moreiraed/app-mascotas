import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { formatDate } from '../utils/dateUtils';
import colors from '@/src/constants/colors';

interface DataListProps<T> {
  title: string;
  data: T[];
  onAdd: () => void;
  onDelete: (id: string) => void;
  onItemPress?: (item: T) => void;
  renderExtraInfo?: (item: T) => React.ReactNode;
}

export function DataList<T extends { id: string; type: string; date: string }>({
  title,
  data,
  onAdd,
  onDelete,
  onItemPress,
  renderExtraInfo,
}: DataListProps<T>) {
  return (
    <View style={styles.dataList}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity style={styles.addSmallButton} onPress={onAdd}>
          <MaterialIcons name="add" size={20} color="#FF9F00" />
        </TouchableOpacity>
      </View>
      {data.map((item) => (
        <View key={item.id} style={styles.dataCard}>
          <TouchableOpacity
            style={styles.dataInfo}
            onPress={() => onItemPress?.(item)}
          >
            <Text style={styles.dataType}>{item.type}</Text>
            <Text style={styles.dataDate}>{formatDate(item.date)}</Text>
            {renderExtraInfo && renderExtraInfo(item)}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(item.id)}
          >
            <MaterialIcons name="delete" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dataList: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addSmallButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  dataCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dataInfo: {
    flex: 1,
  },
  dataType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  dataDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
}); 