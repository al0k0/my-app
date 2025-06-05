import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Checkbox } from 'react-native-paper';
import { useTheme } from '@/context/ThemeContext';

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<{ title: string; completed: boolean }[]>([]);

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { title: task.trim(), completed: false }]);
      setTask('');
    }
  };

  const toggleTask = (index: number) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index: number) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <SafeAreaView className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'} px-4 py-6`}>
      <Text className={`text-2xl font-bold text-center mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
        Daily Task Manager
      </Text>

      {/* Input Section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-row items-center gap-2 mb-4"
      >
        <TextInput
          value={task}
          onChangeText={setTask}
          placeholder="Enter a new task"
          placeholderTextColor={isDark ? '#999' : '#666'}
          className={`flex-1 rounded-lg px-4 py-2 text-base border ${isDark ? 'bg-neutral-800 text-white border-neutral-700' : 'bg-neutral-100 text-black border-gray-300'}`}
        />
        <TouchableOpacity onPress={addTask} className="bg-blue-600 px-4 py-2 rounded-lg">
          <Text className="text-white font-semibold">Add</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <Text className={`text-center mt-12 text-base ${isDark ? 'text-neutral-400' : 'text-gray-500'}`}>
            No tasks yet. Add something!
          </Text>
        }
        renderItem={({ item, index }) => (
          <View className={`flex-row items-center justify-between p-4 rounded-lg mb-3 ${item.completed ? 'bg-green-100' : isDark ? 'bg-neutral-800' : 'bg-gray-100'}`}>
            <TouchableOpacity
              onPress={() => toggleTask(index)}
              className="flex-row items-center gap-3 flex-1"
            >
              <Checkbox
                status={item.completed ? 'checked' : 'unchecked'}
                onPress={() => toggleTask(index)}
                color="#3B82F6"
              />
              <Text className={`text-base ${item.completed ? 'line-through text-gray-500' : isDark ? 'text-white' : 'text-black'}`}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(index)} className="bg-red-500 px-3 py-1.5 rounded-full">
              <Text className="text-white text-sm font-semibold">Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
