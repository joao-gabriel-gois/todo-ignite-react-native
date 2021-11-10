import React from 'react';
import { FlatList} from 'react-native';
import { TaskItem } from './TaskItem';


export interface Task {
  id: number;
  title: string;
  done: boolean;
  editable: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  turnTaskEditable: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
}

export function TasksList({
  tasks,
  ...rest
}: TasksListProps) {

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <TaskItem
            item={item}
            index={index}
            {...rest}
          />
        )
        }
      }
      style={{
        marginTop: 32
      }}
    />
  )
}

