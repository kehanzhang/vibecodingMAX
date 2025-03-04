import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface TimerIntervalProps {
  name: string;
  minutes: number;
  onNameChange: (name: string) => void;
  onMinutesChange: (minutes: number) => void;
  onDelete: () => void;
}

export function TimerInterval({ name, minutes, onNameChange, onMinutesChange, onDelete }: TimerIntervalProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <MaterialIcons name="label" size={20} color="#6B7280" style={styles.icon} />
        <TextInput
          style={styles.nameInput}
          value={name}
          onChangeText={onNameChange}
          placeholder="Timer name"
          placeholderTextColor="#9CA3AF"
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons name="timer" size={20} color="#6B7280" style={styles.icon} />
        <TextInput
          style={styles.minutesInput}
          value={minutes.toString()}
          onChangeText={(text) => {
            const num = parseInt(text) || 0;
            onMinutesChange(num);
          }}
          keyboardType="numeric"
          placeholder="Minutes"
          placeholderTextColor="#9CA3AF"
        />
      </View>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={onDelete}
        activeOpacity={0.7}
      >
        <MaterialIcons name="remove-circle-outline" size={24} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 16,
    gap: 12,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  nameInput: {
    flex: 2,
    fontSize: 16,
    color: '#1F2937',
    padding: 4,
  },
  minutesInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    padding: 4,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});