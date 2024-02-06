import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {useWorklet} from 'react-native-worklets-core';

export default function App() {
  const sharedValue = useSharedValue(0);

  const updateSharedValueFromWorklet = useWorklet(
    'default',
    () => {
      'worklet';
      sharedValue.value = Math.random();
    },
    [sharedValue],
  );

  return (
    <View>
      <Button
        onPress={updateSharedValueFromWorklet}
        title="Update shared value from different worklet"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
