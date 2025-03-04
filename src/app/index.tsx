import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { TimerInterval } from '@/components/TimerInterval';
import { Timer } from '@/components/Timer';

interface Interval {
  id: string;
  name: string;
  minutes: number;
}

export default function App() {
  const [intervals, setIntervals] = useState<Interval[]>([
    { id: '1', name: 'Study', minutes: 25 },
    { id: '2', name: 'Rest', minutes: 5 },
  ]);
  const [currentIntervalIndex, setCurrentIntervalIndex] = useState(0);

  const addInterval = () => {
    const newId = (intervals.length + 1).toString();
    setIntervals([...intervals, { id: newId, name: '', minutes: 25 }]);
  };

  const updateInterval = (id: string, updates: Partial<Interval>) => {
    setIntervals(intervals.map(interval =>
      interval.id === id ? { ...interval, ...updates } : interval
    ));
  };

  const deleteInterval = (id: string) => {
    setIntervals(intervals.filter(interval => interval.id !== id));
    if (currentIntervalIndex >= intervals.length - 1) {
      setCurrentIntervalIndex(Math.max(0, intervals.length - 2));
    }
  };

  const handleTimerComplete = () => {
    if (currentIntervalIndex < intervals.length - 1) {
      setCurrentIntervalIndex(currentIntervalIndex + 1);
    } else {
      setCurrentIntervalIndex(0);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHalf}>
        <ScrollView style={styles.intervalList}>
          {intervals.map((interval) => (
            <TimerInterval
              key={interval.id}
              name={interval.name}
              minutes={interval.minutes}
              onNameChange={(name) => updateInterval(interval.id, { name })}
              onMinutesChange={(minutes) => updateInterval(interval.id, { minutes })}
              onDelete={() => deleteInterval(interval.id)}
            />
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.addButton} onPress={addInterval}>
          <Text style={styles.addButtonText}>+ Add Interval</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.bottomHalf}>
        {intervals.length > 0 && (
          <>
            <Text style={styles.currentIntervalName}>
              {intervals[currentIntervalIndex].name || 'Unnamed Interval'}
            </Text>
            <Timer
              minutes={intervals[currentIntervalIndex].minutes}
              onComplete={handleTimerComplete}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50, // Add top padding for safe area
  },
  topHalf: {
    flex: 1,
    padding: 20,
  },
  intervalList: {
    flex: 1,
    paddingBottom: 10, // Add bottom padding for better spacing
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomHalf: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    justifyContent: 'center',
  },
  currentIntervalName: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});