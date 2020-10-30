import React, { useState } from 'react'
import Task from '../models/Task'
import { Action, HandleState } from './App'

const FormUser = ({ dispatch }: { dispatch: React.Dispatch<HandleState> }) => {

    const [value, setValue] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        //Avoid to refresh the page
        e.preventDefault()

        if (value.length === 0)
            return

        //Creating the data to add to list
        const id = 'id_' + (new Date()).getTime();

        const task = new Task(id, value)

        console.log(`Value sent: ${value}`)

        const hS: HandleState = {
            action: Action.AddTask,
            task: task,
        }

        dispatch(hS)
        //Clean the input box
        setValue('')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit}
        >
            <input
                className="input-user"
                type="text"
                placeholder="Add a new task"
                value={value}
                //name: Specifies the name of an <input> element
                name="task"
                autoComplete="off"
                maxLength={30}
                onChange={handleChange}
            />
            <button>Add Task</button>
        </form>
    )
}

export default FormUser
