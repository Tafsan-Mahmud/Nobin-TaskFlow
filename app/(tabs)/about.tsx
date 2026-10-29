// About tab: lab and student information.

import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';

// Uniwind needs this wrapper so "className" works on SafeAreaView
const StyledSafeAreaView = withUniwind(SafeAreaView);

export default function AboutScreen() {
  return (
    <StyledSafeAreaView edges={['top']} className="flex-1 bg-flow-600">
      <View className="flex-1 bg-flow-50">
        {/* Header */}
        <View className="bg-flow-600 pb-8 pt-3">
          <View className="w-full max-w-xl self-center px-5">
            <Text className="text-3xl font-extrabold text-white md:text-4xl">About</Text>
            <Text className="mt-1 text-flow-200">Lab Task: Todo List App using React Native</Text>
          </View>
        </View>

        <View className="w-full max-w-xl flex-1 self-center px-5">
          <View className="-mt-4 items-center rounded-3xl bg-white p-6 shadow-lg">
            <View className="h-16 w-16 items-center justify-center rounded-full bg-flow-100">
              <Text className="text-3xl">👤</Text>
            </View>
            <Text className="mt-3 text-xl font-bold text-flow-900">Abu Hasnat Nobin</Text>
            <Text className="text-slate-500">Roll: 20</Text>
            <Text className="mt-3 rounded-full bg-flow-100 px-4 py-1 text-sm font-semibold text-flow-700">
              TaskFlow
            </Text>
          </View>

          <View className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
            <Text className="mb-2 font-bold text-flow-600">What this app can do</Text>
            <Text className="py-0.5 text-slate-600">• Add new tasks</Text>
            <Text className="py-0.5 text-slate-600">• Mark tasks as done or not done</Text>
            <Text className="py-0.5 text-slate-600">• Delete tasks and clear completed ones</Text>
            <Text className="py-0.5 text-slate-600">• Filter: All / Active / Done</Text>
            <Text className="py-0.5 text-slate-600">• See how many tasks are remaining</Text>
          </View>
        </View>
      </View>
    </StyledSafeAreaView>
  );
}
