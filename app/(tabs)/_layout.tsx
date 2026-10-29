// Bottom tabs layout. Each file inside app/(tabs) becomes one tab:
//   index.tsx   -> Tasks
//   summary.tsx -> Summary
//   about.tsx   -> About

import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useCSSVariable, useResolveClassNames } from 'uniwind';

export default function TabsLayout() {
  // Colors come from global.css, so the theme stays in one place
  const activeColor = (useCSSVariable('--color-flow-600') as string) ?? '#4f46e5';
  const inactiveColor = (useCSSVariable('--color-flow-muted') as string) ?? '#94a3b8';

  // Tailwind classes turned into style objects for the tab bar
  const tabBarStyle = useResolveClassNames('bg-white border-t border-flow-100');
  const tabBarLabelStyle = useResolveClassNames('text-xs font-bold');

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle,
        tabBarLabelStyle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'checkmark-circle' : 'checkmark-circle-outline'}
              size={size}
              color={color as string}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="summary"
        options={{
          title: 'Summary',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'stats-chart' : 'stats-chart-outline'}
              size={size}
              color={color as string}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person-circle' : 'person-circle-outline'}
              size={size}
              color={color as string}
            />
          ),
        }}
      />
    </Tabs>
  );
}
