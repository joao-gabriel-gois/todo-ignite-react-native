import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find(task => task.title === newTaskTitle)) {
      Alert.alert('Task já existe!', 'Adicione uma nova tarefa com título diferente das anteriores');
      return;
    }
    
    const task = {
      id: tasks.length,
      title: newTaskTitle,
      done: false,
      editable: false,
    }
    setTasks([...tasks, task]);
  }

  function turnTaskEditable(id: number) {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          editable: !task.editable
        }
      }
      return task;
    });

    setTasks(newTasks);
  }

  function handleEditTask(id: number, newTitle: string) {
    if (tasks.find(task => task.title === newTitle)) {
      Alert.alert('Task já existe!', 'Edite essa tarefa com título diferente das anteriores');
      return;
    }
    
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          title: newTitle,
          editable: false,
        }  
      }
      return task;
    });

    setTasks(newTasks);
  }

  function handleToggleTaskDone(id: number) {
    const currentTask = tasks.find(task => task.id === id);
    
    if (!currentTask?.editable) {
      const newTasks = tasks.map(task => {
        if (task.id === id ) {
          return {
            ...task,
            done: !task.done,
          }  
        }
        return task;
      });

      setTasks(newTasks);
    }
  }

  function removeTask(id: number) {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    const currentTask = tasks.find(task => task.id === id);
    
    if (!currentTask?.editable) {
      Alert.alert(
        'Deseja remover essa task?',
        `Confirme em caso de realmente desejar remover a task atual: ${currentTask?.title}`,
        [
          {
            text: 'Sim',
            onPress: () => removeTask(id),
          },
          {
            text: 'Não',
          }
        ]
      )
      return;
    }

    turnTaskEditable(id);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        turnTaskEditable={turnTaskEditable}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})