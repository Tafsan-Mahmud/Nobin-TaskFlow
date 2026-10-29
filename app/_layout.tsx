// Root layout: runs first. It loads Tailwind (global.css),
// gives every screen the shared task data, and shows the (tabs) group.

import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FlowTaskProvider } from '../context/FlowTaskContext';

export default function RootLayout() {
  return (
    <FlowTaskProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </FlowTaskProvider>
  );
}
