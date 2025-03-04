import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions, Animated, Easing } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface TimerProps {
  minutes: number;
  onComplete: () => void;
}

export function Timer({ minutes, onComplete }: TimerProps) {
  const [fadeAnim] = useState(new Animated.Value(1));
  const [bgColor, setBgColor] = useState('#3B82F6'); // Start with blue
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0.7,
            duration: 1000,
            easing: Easing.inOut(Easing.sine),
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.sine),
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Change background color based on time remaining
      const totalTime = minutes * 60;
      const progress = timeLeft / totalTime;
      if (progress > 0.66) {
        setBgColor('#3B82F6'); // Blue
      } else if (progress > 0.33) {
        setBgColor('#8B5CF6'); // Purple
      } else {
        setBgColor('#EC4899'); // Pink
      }

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
    } else {
      fadeAnim.setValue(1);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft, onComplete, fadeAnim, minutes]);

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
    <Animated.View 
      style={[
        styles.container, 
        containerStyle,
        { opacity: fadeAnim, backgroundColor: bgColor }
      ]}
    >
      {showExitButton && (
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => {
            setIsFullscreen(false);
            setIsRunning(false);
          }}
        >
          <MaterialIcons name="keyboard-arrow-down" size={32} color="white" />
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
          <MaterialIcons 
            name={isRunning ? "pause-circle-filled" : "play-circle-filled"} 
            size={showExitButton ? 80 : 48} 
            color="white" 
          />
        </TouchableOpacity>
        {!isRunning && (
          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={() => {
              setTimeLeft(minutes * 60);
              setIsRunning(false);
              setIsFullscreen(false);
            }}
          >
            <MaterialIcons name="refresh" size={showExitButton ? 60 : 36} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
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
    borderRadius: 20,
  },
  fullscreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 72,
    fontWeight: '300',
    color: 'white',
    marginBottom: 40,
    fontFamily: 'System',
  },
  fullscreenTime: {
    fontSize: 140,
    letterSpacing: -5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 'auto',
  },
  startButton: {
    opacity: 1,
  },
  stopButton: {
    opacity: 0.9,
  },
  resetButton: {
    opacity: 0.7,
  },
  exitButton: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    zIndex: 1000,
  },
});