import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ItemWrapper } from './ItemWrapper';

import trashIcon from '../assets/icons/trash/trash.png'
import closeIcon from '../assets/icons/close/close.png';
import editIcon from '../assets/icons/edit/edit.png';
import { Task } from './TasksList';



interface TaskItemProps {
  index: number,
  item: Task,
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  turnTaskEditable: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
}

const TaskItem = (
  {
    item,
    index,
    toggleTaskDone,
    removeTask,
    turnTaskEditable,
    editTask
  }: TaskItemProps
) => {
  const [ currentEditableTask, setCurrentEditableTask ] = useState('');
  
  return (
    <ItemWrapper index={index}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={item.editable ? 1 : 0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={() => toggleTaskDone(item.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { item.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>
          {
            item.editable ? 
              <TextInput 
                style={[styles.taskText, {marginVertical: -3.5, color: '#999' }]}
                placeholder={item.title}
                onChangeText={setCurrentEditableTask}
                onSubmitEditing={() => editTask(item.id, currentEditableTask)}
                disableFullscreenUI={false}        
              /> 
            :
              <Text 
                style={item.done ? styles.taskTextDone : styles.taskText}
              >
                {item.title}
              </Text>
          }
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
        <TouchableOpacity
          testID={`edit-${index}`}
          style={{ paddingHorizontal: 12 }}
          //TODO - use onPress (edit task) prop
          onPress={() => turnTaskEditable(item.id)}
        >
          <Image
            source={item.editable ? closeIcon : editIcon}
            style={item.editable ? {marginRight: 6 }: {}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ marginRight: 6 }}
          activeOpacity={
            item.editable ? 1 : .7
          }
          //TODO - use onPress (remove task) prop
          onPress={() => removeTask(item.id)}
        >
          <Image 
            source={trashIcon} 
            style={item.editable ? { opacity: .3 } : {}}  
          />
        </TouchableOpacity>
      </View>
    </ItemWrapper>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    width: '67%',
    marginVertical: 0,
    paddingVertical: 0
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    width: '67%',
  }
});

export { TaskItem };
