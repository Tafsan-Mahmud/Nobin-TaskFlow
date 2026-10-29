// Summary tab: shows numbers about your tasks.

import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';
import { useFlowTasks } from '../../context/FlowTaskContext';

// Uniwind needs this wrapper so "className" works on SafeAreaView
const StyledSafeAreaView = withUniwind(SafeAreaView);

const progressSteps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function SummaryScreen() {
  const { totalCount, remainingCount, doneCount, percentDone } = useFlowTasks();
  const filledSteps = Math.round(percentDone / 10);

  return (
    <StyledSafeAreaView edges={['top']} className="flex-1 bg-flow-600">
      <View className="flex-1 bg-flow-50">
        {/* Header */}
        <View className="bg-flow-600 pb-8 pt-3">
          <View className="w-full max-w-xl self-center px-5">
            <Text className="text-3xl font-extrabold text-white md:text-4xl">Summary</Text>
            <Text className="mt-1 text-flow-200">Your progress at a glance</Text>
          </View>
        </View>

        <View className="w-full max-w-xl flex-1 self-center px-5">
          {/* Big percent card */}
          <View className="-mt-4 items-center rounded-3xl bg-white p-6 shadow-lg">
            <Text className="text-6xl font-extrabold text-flow-600">{percentDone}%</Text>
            <Text className="mt-1 text-slate-500">of your tasks are done</Text>
            <View className="mt-4 w-full flex-row gap-1">
              {progressSteps.map((step) => (
                <View
                  key={step}
                  className={`h-2 flex-1 rounded-full ${
                    step < filledSteps ? 'bg-flow-600' : 'bg-flow-100'
                  }`}
                />
              ))}
            </View>
          </View>

          {/* Three small cards */}
          <View className="mt-4 flex-row gap-3">
            <View className="flex-1 rounded-2xl bg-white p-4 shadow-sm">
              <Text className="text-3xl font-bold text-flow-900">{totalCount}</Text>
              <Text className="mt-1 text-xs text-slate-500">Total</Text>
            </View>
            <View className="flex-1 rounded-2xl bg-white p-4 shadow-sm">
              <Text className="text-3xl font-bold text-flow-600">{doneCount}</Text>
              <Text className="mt-1 text-xs text-slate-500">Completed</Text>
            </View>
            <View className="flex-1 rounded-2xl bg-white p-4 shadow-sm">
              <Text className="text-3xl font-bold text-flow-accent">{remainingCount}</Text>
              <Text className="mt-1 text-xs text-slate-500">Remaining</Text>
            </View>
          </View>
        </View>
      </View>
    </StyledSafeAreaView>
  );
}
