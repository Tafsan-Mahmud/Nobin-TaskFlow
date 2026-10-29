// Shared task data for all tabs (Tasks, Summary, About).
// Every screen can read the same list by calling useFlowTasks().

import { createContext, ReactNode, useContext, useState } from 'react';
import { LayoutAnimation } from 'react-native';

// ---------- Types ----------
export type FlowTask = {
  id: string;
  title: string;
  isFinished: boolean;
  addedAt: string;
};

type FlowTaskContextValue = {
  taskList: FlowTask[];
  totalCount: number;
  remainingCount: number;
  doneCount: number;
  percentDone: number;
  handleAddTask: (title: string) => void;
  handleToggleTask: (taskId: string) => void;
  handleDeleteTask: (taskId: string) => void;
  handleClearDone: () => void;
};

const FlowTaskContext = createContext<FlowTaskContextValue | null>(null);

// Small helper: current time like "8:45 PM"
const getTimeNow = () =>
  new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

// Makes list changes smooth
const animateChange = () =>
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

// ---------- Provider ----------
export function FlowTaskProvider({ children }: { children: ReactNode }) {
  // The ONE list of tasks used by the whole app
  const [taskList, setTaskList] = useState<FlowTask[]>([
    { id: '1', title: 'Install Expo and run the app', isFinished: true, addedAt: '9:00 AM' },
    { id: '2', title: 'Finish the React Native lab task', isFinished: false, addedAt: '9:30 AM' },
    { id: '3', title: 'Push the project to GitHub', isFinished: false, addedAt: '10:15 AM' },
  ]);

  const handleAddTask = (title: string) => {
    const cleanText = title.trim();
    if (cleanText === '') return;

    const newTask: FlowTask = {
      id: Date.now().toString(),
      title: cleanText,
      isFinished: false,
      addedAt: getTimeNow(),
    };

    animateChange();
    setTaskList([newTask, ...taskList]);
  };

  const handleToggleTask = (taskId: string) => {
    animateChange();
    setTaskList(
      taskList.map((task) =>
        task.id === taskId ? { ...task, isFinished: !task.isFinished } : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    animateChange();
    setTaskList(taskList.filter((task) => task.id !== taskId));
  };

  const handleClearDone = () => {
    animateChange();
    setTaskList(taskList.filter((task) => !task.isFinished));
  };

  // Numbers used on the screens
  const totalCount = taskList.length;
  const remainingCount = taskList.filter((task) => !task.isFinished).length;
  const doneCount = totalCount - remainingCount;
  const percentDone = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

  return (
    <FlowTaskContext.Provider
      value={{
        taskList,
        totalCount,
        remainingCount,
        doneCount,
        percentDone,
        handleAddTask,
        handleToggleTask,
        handleDeleteTask,
        handleClearDone,
      }}
    >
      {children}
    </FlowTaskContext.Provider>
  );
}

// ---------- Hook used by the screens ----------
export function useFlowTasks() {
  const value = useContext(FlowTaskContext);
  if (value === null) {
    throw new Error('useFlowTasks must be used inside FlowTaskProvider');
  }
  return value;
}
