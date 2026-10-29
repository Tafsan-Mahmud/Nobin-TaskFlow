// Tasks tab: add, show, complete and delete tasks.

import { useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';
import { FlowTask, useFlowTasks } from '../../context/FlowTaskContext';

// Uniwind needs this wrapper so "className" works on SafeAreaView
const StyledSafeAreaView = withUniwind(SafeAreaView);

type FlowFilterName = 'all' | 'active' | 'done';

const flowFilters: { name: FlowFilterName; label: string }[] = [
  { name: 'all', label: 'All' },
  { name: 'active', label: 'Active' },
  { name: 'done', label: 'Done' },
];

// 10 small steps used to draw the progress bar
const progressSteps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Today's date like "Thursday, October 29"
const getDateToday = () =>
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

export default function TasksScreen() {
  const {
    taskList,
    totalCount,
    remainingCount,
    doneCount,
    percentDone,
    handleAddTask,
    handleToggleTask,
    handleDeleteTask,
    handleClearDone,
  } = useFlowTasks();

  // Local state: only this screen needs these two
  const [newTaskText, setNewTaskText] = useState('');
  const [activeFilter, setActiveFilter] = useState<FlowFilterName>('all');

  const filledSteps = Math.round(percentDone / 10);
  const filterCounts = { all: totalCount, active: remainingCount, done: doneCount };

  // Tasks that match the selected filter
  const visibleTasks = taskList.filter((task) => {
    if (activeFilter === 'active') return !task.isFinished;
    if (activeFilter === 'done') return task.isFinished;
    return true;
  });

  const onPressAdd = () => {
    handleAddTask(newTaskText);
    setNewTaskText('');
  };

  // One row of the list
  const renderTask = ({ item }: { item: FlowTask }) => (
    <View className="mb-3 flex-row items-center rounded-2xl bg-white p-4 shadow-sm">
      <Pressable
        onPress={() => handleToggleTask(item.id)}
        hitSlop={8}
        className={`mr-3 h-7 w-7 items-center justify-center rounded-full border-2 ${
          item.isFinished ? 'border-flow-600 bg-flow-600' : 'border-flow-200 bg-white'
        }`}
      >
        {item.isFinished && <Text className="text-xs font-bold text-white">✓</Text>}
      </Pressable>

      <Pressable onPress={() => handleToggleTask(item.id)} className="flex-1">
        <Text
          className={`text-base md:text-lg ${
            item.isFinished ? 'text-slate-400 line-through' : 'font-semibold text-flow-900'
          }`}
        >
          {item.title}
        </Text>
        <Text className="mt-0.5 text-xs text-slate-400">Added {item.addedAt}</Text>
      </Pressable>

      <Pressable
        onPress={() => handleDeleteTask(item.id)}
        hitSlop={8}
        className="ml-2 h-9 w-9 items-center justify-center rounded-full bg-red-50 active:bg-red-100"
      >
        <Text className="text-sm font-bold text-red-500">✕</Text>
      </Pressable>
    </View>
  );

  return (
    <StyledSafeAreaView edges={['top']} className="flex-1 bg-flow-600">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 bg-flow-50"
      >
        {/* Header */}
        <View className="bg-flow-600 pb-12 pt-3">
          <View className="w-full max-w-xl self-center px-5">
            <Text className="text-sm font-medium text-flow-200">{getDateToday()}</Text>
            <Text className="mt-1 text-3xl font-extrabold text-white md:text-4xl">
              Hello, Nobin 👋
            </Text>
            <Text className="mt-1 text-base text-flow-100">
              {remainingCount === 0
                ? 'You finished everything. Great job!'
                : `You have ${remainingCount} task${remainingCount === 1 ? '' : 's'} left today.`}
            </Text>

            {/* Progress bar */}
            <View className="mt-5 flex-row gap-1">
              {progressSteps.map((step) => (
                <View
                  key={step}
                  className={`h-2 flex-1 rounded-full ${
                    step < filledSteps ? 'bg-white' : 'bg-white/25'
                  }`}
                />
              ))}
            </View>
            <Text className="mt-2 text-xs font-semibold text-flow-200">
              {doneCount} of {totalCount} done · {percentDone}%
            </Text>
          </View>
        </View>

        {/* Body */}
        <View className="-mt-7 w-full max-w-xl flex-1 self-center">
          {/* Add task card */}
          <View className="px-5">
            <View className="flex-row items-center rounded-2xl bg-white p-2 shadow-lg">
              <TextInput
                value={newTaskText}
                onChangeText={setNewTaskText}
                onSubmitEditing={onPressAdd}
                placeholder="Add a new task..."
                placeholderTextColorClassName="accent-slate-400"
                returnKeyType="done"
                className="h-11 flex-1 px-3 py-0 text-[16px] text-flow-900"
              />
              <Pressable
                onPress={onPressAdd}
                className="h-11 w-11 items-center justify-center rounded-xl bg-flow-accent active:opacity-70"
              >
                <Text className="text-2xl font-bold text-white">+</Text>
              </Pressable>
            </View>
          </View>

          {/* Filter chips */}
          <View className="flex-row gap-2 px-5 pb-3 pt-4">
            {flowFilters.map((filter) => {
              const isOn = activeFilter === filter.name;
              return (
                <Pressable
                  key={filter.name}
                  onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setActiveFilter(filter.name);
                  }}
                  className={`flex-row items-center rounded-full px-4 py-2 ${
                    isOn ? 'bg-flow-600' : 'bg-white'
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${isOn ? 'text-white' : 'text-flow-700'}`}
                  >
                    {filter.label}
                  </Text>
                  <View
                    className={`ml-2 rounded-full px-2 ${isOn ? 'bg-white/25' : 'bg-flow-100'}`}
                  >
                    <Text className={`text-xs font-bold ${isOn ? 'text-white' : 'text-flow-700'}`}>
                      {filterCounts[filter.name]}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* The list */}
          <FlatList
            data={visibleTasks}
            keyExtractor={(item) => item.id}
            renderItem={renderTask}
            className="flex-1"
            contentContainerClassName="px-5 pb-8"
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            onScrollBeginDrag={Keyboard.dismiss}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View className="mt-12 items-center">
                <Text className="text-5xl">{activeFilter === 'done' ? '🕐' : '🎉'}</Text>
                <Text className="mt-3 text-lg font-bold text-flow-700">
                  {activeFilter === 'done' ? 'Nothing completed yet' : 'No tasks here'}
                </Text>
                <Text className="mt-1 text-slate-500">
                  {activeFilter === 'done'
                    ? 'Finish a task and it will show up here.'
                    : 'Add a task using the box above.'}
                </Text>
              </View>
            }
            ListFooterComponent={
              doneCount > 0 ? (
                <Pressable
                  onPress={handleClearDone}
                  className="mt-1 items-center rounded-2xl border border-flow-200 py-3 active:bg-flow-100"
                >
                  <Text className="font-semibold text-flow-600">Clear {doneCount} completed</Text>
                </Pressable>
              ) : undefined
            }
          />
        </View>
      </KeyboardAvoidingView>
    </StyledSafeAreaView>
  );
}
