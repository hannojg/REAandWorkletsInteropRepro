import React from 'react';
import {Button, StyleSheet} from 'react-native';
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Worklets} from 'react-native-worklets-core';

export default function App() {
  const color = useSharedValue('white');

  const updateSharedValueFromWorklet = () => {
    'worklet';
    color.value = ['red', 'blue', 'green'][Math.floor(Math.random() * 3)];
  };

  const workletCoreFct = Worklets.createRunInContextFn(
    updateSharedValueFromWorklet,
  );

  const onPress = () => {
    runOnUI(workletCoreFct)();
  };

  const animBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: color.value,
    };
  }, [color]);

  return (
    <Animated.View style={[styles.centerContent, animBackgroundStyle]}>
      <Button
        onPress={onPress}
        title="Update shared value from different worklet"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
