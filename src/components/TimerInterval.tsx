import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

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
      <TextInput
        style={styles.nameInput}
        value={name}
        onChangeText={onNameChange}
        placeholder="Interval name"
      />
      <TextInput
        style={styles.minutesInput}
        value={minutes.toString()}
        onChangeText={(text) => {
          const num = parseInt(text) || 0;
          onMinutesChange(num);
        }}
        keyboardType="numeric"
        placeholder="Minutes"
      />
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  nameInput: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  minutesInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
  },
});