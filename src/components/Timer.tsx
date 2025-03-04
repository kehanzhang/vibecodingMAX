import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';

interface TimerProps {
  minutes: number;
  onComplete: () => void;
}

export function Timer({ minutes, onComplete }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft, onComplete]);

  useEffect(() => {
    setTimeLeft(minutes * 60);
    setIsRunning(false);
  }, [minutes]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartPress = () => {
    setIsRunning(!isRunning);
    if (!isRunning) {
      setIsFullscreen(true);
    }
  };

  const TimerContent = ({ containerStyle = {}, showExitButton = false }) => (
    <View style={[styles.container, containerStyle]}>
      {showExitButton && (
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => {
            setIsFullscreen(false);
          }}
        >
          <Text style={styles.exitButtonText}>✕</Text>
        </TouchableOpacity>
      )}
      <Text style={[styles.time, showExitButton && styles.fullscreenTime]}>
        {formatTime(timeLeft)}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isRunning ? styles.stopButton : styles.startButton]}
          onPress={handleStartPress}
        >
          <Text style={styles.buttonText}>
            {isRunning ? 'Stop' : 'Start'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={() => {
            setTimeLeft(minutes * 60);
            setIsRunning(false);
            setIsFullscreen(false);
          }}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <TimerContent />
      <Modal
        visible={isFullscreen}
        animationType="fade"
        transparent={false}
        onRequestClose={() => setIsFullscreen(false)}
      >
        <TimerContent
          containerStyle={styles.fullscreenContainer}
          showExitButton={true}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 72,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fullscreenTime: {
    fontSize: 120,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#f44336',
  },
  resetButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  exitButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#ff4444',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  exitButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});