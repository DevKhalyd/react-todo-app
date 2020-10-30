//NOTE: In React all is is split in components to make hS better UI experience 
import React, { useReducer } from 'react';
import Task from '../models/Task';
import FormUser from './Form';
import TaskList from './TaskList';
//Read the storage from the browsers
import * as ls from "local-storage";

type State = {
  list: Task[]
}

export const tasksObject = 'tasks'

export type HandleState = {
  action: Action,
  task: Task,
}

export enum Action {
  AddTask,
  DeleteTask,
  EditTask,
}




//Handles the state about the UI
//state: Current state
const reducer = (state: State, hS: HandleState): State => {

  const currentList = state.list
  const { action, task } = hS

  //split docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
  switch (action) {
    case Action.AddTask:
      //Return the list with the new task
      return {
        list: [...currentList, task],
      }
    case Action.DeleteTask:

      const index = currentList.findIndex(item => item.id === task.id)

      if (index < 0) {
        //No changes
        console.log('The item cannot be found')
        //Return the same list
        return {
          list: [...currentList],
        }
      }
      //Remove 1 element at `index`
      currentList.splice(index, 1)

      return {
        list: [...currentList],
      }
    case Action.EditTask:
      //Find the task
      const indexEdit = currentList.findIndex(item => item.id === task.id)
      if (indexEdit < 0) {
        //No changes
        console.log('The item cannot be found')
        //Return the same list
        return {
          list: [...currentList],
        }
      }
      //Remove 1 element at `indexEdit`, and insert "task"
      currentList.splice(indexEdit, 1, task)
      //Return the list updated
      return {
        list: [...currentList],
      }
    default:
      throw new Error('Action missing. Please update the Action enum')
  }
}

function App() {

  let defaultValue: Task[] = []

  const fromStorage = ls.get<Task[]>(tasksObject)

  if (fromStorage) {

    const tasksToUse: Task[] = []

    console.log('From list');
    console.log(fromStorage);
    console.log('Reading list');
    fromStorage.forEach(task => {
      tasksToUse.push(new Task(task.id, task.description))
    })

    defaultValue = tasksToUse

  }
  //This reducer only handles this type
  const initialState: State = {
    // list: []
    list: defaultValue
  }

  const [{ list }, dispatch] = useReducer(reducer, initialState)

  console.log('This is the initial value')
  console.log(initialState)

  return (
    <div className="container-main">
      <h2>What's the Plan for Today</h2>
      <br />
      {/* Allow to enter the new tasks */}
      <FormUser dispatch={dispatch} />
      <br />
      {/* Allow to see the task,deletes and edits */}
      <TaskList list={list} dispatch={dispatch} />
    </div>
  )
}



export default App;