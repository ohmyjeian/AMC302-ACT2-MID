import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {

  const [enteredGoalText, setEnteredGoalText] = useState('');
  
  const [courseGoal, setCourseGoal] = useState([]);
  
  const [editingIndex, setEditingIndex] = useState(null);

  const goalInputHandler = (enteredText) => {
    setEnteredGoalText(enteredText)
  };

  const addGoalHandler = () => {
    if (enteredGoalText.trim() === '') return;

    if (editingIndex !== null) {
      const updatedGoals = [...courseGoal];
      updatedGoals[editingIndex] = { 
        text: enteredGoalText, 
        id: updatedGoals[editingIndex].id, 
        hidden: updatedGoals[editingIndex].hidden 
      };
      setCourseGoal(updatedGoals)
      setEditingIndex(null);
    } else {
      setCourseGoal((currentCourseGoal) => [
        ...currentCourseGoal,
        { text: enteredGoalText, id: Math.random().toString(), hidden: false } 
      ]);
    }
    setEnteredGoalText('');
  };

  const deleteGoal = (index) => {
    const updatedGoals = [...courseGoal];
    updatedGoals.splice(index, 1);
    setCourseGoal(updatedGoals);
    if (editingIndex === index) setEditingIndex(null);
  };

  const startEditing = (index) => {
    setEnteredGoalText(courseGoal[index].text);
    setEditingIndex(index);
  };

  const toggleGoalVisibility = (index) => {
    const updatedGoals = [...courseGoal];
    updatedGoals[index].hidden = !updatedGoals[index].hidden;
    setCourseGoal(updatedGoals);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="My Goal"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
          style={styles.input}
        />
        <Button
          title={editingIndex !== null ? 'Edit Goal' : 'Add Goal'}
          onPress={addGoalHandler}
          color="#5e60e6"
        />
      </View>

      <FlatList
        data={courseGoal}
        renderItem={({ item, index }) => (
          !item.hidden && (
            <View style={styles.goalItem}>
              <Text style={styles.goalText}>{item.text}</Text>
              <View style={styles.buttons}>
                <TouchableOpacity onPress={() => deleteGoal(index)}>
                  <Text style={styles.deleteText}>X</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => startEditing(index)}>
                  <Text style={styles.editText}>EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleGoalVisibility(index)}>
                  <Text style={styles.editText}>{item.hidden ? 'UNHIDE' : '   HIDE'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        )}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.unhideContainer}>
        <Button
          title="Unhide All"
          onPress={() => {
            const updatedGoals = courseGoal.map(goal => ({ ...goal, hidden: false }));
            setCourseGoal(updatedGoals);
          }}
          color="#5e60e6"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '75%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  goalItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  goalText: {
    fontSize: 16,
    color: '#333',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  deleteText: {
    color: '#ff5c5c',
    marginRight: 15,
    fontWeight: 'bold',
  },
  editText: {
    color: '#5e60e6',
    fontWeight: 'bold',
  },
  unhideContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
