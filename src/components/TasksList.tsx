import React, { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View, Text, StyleSheet, FlatListProps, TextInput, TimePickerAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { ItemWrapper } from './ItemWrapper';

import trashIcon from '../assets/icons/trash/trash.png'
import closeIcon from '../assets/icons/close/close.png';
import editIcon from '../assets/icons/edit/edit.png';

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

export function TasksList({ tasks, toggleTaskDone, removeTask, turnTaskEditable, editTask }: TasksListProps) {
  const [ currentEditableTask, setCurrentEditableTask ] = useState('');

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
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
                      style={[styles.taskText, {marginVertical: -8, color: '#888' }]}
                      placeholder={item.title}
                      onChangeText={setCurrentEditableTask}
                      onSubmitEditing={() => editTask(item.id, currentEditableTask)}        
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
                  style={item.editable ? {marginRight: 6, marginBottom: 2}: {}}
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
      }}
      style={{
        marginTop: 32
      }}
    />
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
    padding:0,
    margin:0,
    fontSize: 14,
    lineHeight: 15,
    width: '67%',
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
    fontFamily: 'Inter-Medium'
  }
})