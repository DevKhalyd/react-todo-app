import React, { useState } from 'react'
import Task, { colorsItems } from '../models/Task'
import { FaTrash, FaEdit } from "react-icons/fa"
import { IconContext } from 'react-icons/lib'
import { Action, HandleState, tasksObject } from './App'
import * as ls from "local-storage";


const TaskList = ({ list, dispatch }: { list: Task[], dispatch: React.Dispatch<HandleState> }) => {

    //Saving the current state list
    ls.set<Task[]>(tasksObject, list);

    const itemBase = (item: Task) =>
        (<div className="row">
            <div className="block"> <p>{item.description}</p></div>
            <div className="block-right" onClick={() => onClickDelete(item, dispatch)}>{getIconCustom(<FaTrash />, "white")}</div>
            <div className="block-right" onClick={() => onClickEdit(item, dispatch)}>{getIconCustom(<FaEdit />, "white")}</div>
        </div>)

    //Component inside a compoen should be Capitalizedl



    const ItemEdit = (item: Task) => {

        const [value, setValue] = useState(item.description)


        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)



        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            //Avoid to refresh the page
            e.preventDefault()

            if (value.length === 0)
                return

            const task = item.copyWith({
                description: value,
                isEditing: false
            })

            const hS: HandleState = {
                action: Action.EditTask,
                task: task,
            }

            dispatch(hS)
            //Clean the input box
            setValue('')
        }






        return (
            <>
                <form onSubmit={handleSubmit}>
                    <input
                        className="input-edit"
                        type="text"
                        placeholder="Edit task"
                        value={value}
                        //name: Specifies the name of an <input> element
                        name="task"
                        autoComplete="off"
                        maxLength={30}
                        onChange={handleChange}
                    />
                    <button
                        className="button-edit"
                    >Edit Task</button>
                </form>
            </>
        )

    }










    return (
        //Using a Fragment mode short without properties
        <>
            <ul >
                {list.map((item, i, tasks) => {

                    //item.getPosColorUnque(i, tasks);

                    const listColors = getListColors(item, i, tasks)


                    return <li style={{ backgroundImage: `linear-gradient(to right, ${listColors[0]}, ${listColors[1]}` }}
                        key={item.id}>

                        {/* This div contains the row to show when is in state base */}
                        {/* Try to use the same classes */}
                        {item.isEditing === false ? itemBase(item) : ItemEdit(item)}

                    </li>
                })}
            </ul>
        </>
    )
}

function onClickEdit(i: Task, dispatch: any) {

    const item = i.copyWith({
        isEditing: !i.isEditing
    })

    const hS: HandleState = {
        action: Action.EditTask,
        task: item,
    }
    dispatch(hS)

}

function onClickDelete(item: Task, dispatch: any) {
    const hS: HandleState = {
        action: Action.DeleteTask,
        task: item,
    }
    dispatch(hS)
}



function getListColors(item: Task, i: number, tasks: Task[]): string[] {

    const currentColor = item.hexColorPos;

    const listColors = (pos: number) => colorsItems[pos]

    //First item
    if (i === 0)
        return listColors(currentColor)


    //Color used in previous task
    const colorPosUsed = tasks[i - 1].hexColorPos

    if (colorPosUsed !== currentColor)
        return listColors(currentColor)

    //Are the same color
    if (currentColor === colorsItems.length - 1)
        return listColors(item.getColorPosition(colorPosUsed))

    return listColors(item.getColorPosition(colorPosUsed))

}



function getIconCustom(icon: JSX.Element, color: string): JSX.Element {
    return (<IconContext.Provider value={{ color: color, size: "1.25em" }}>
        <div>
            {icon}
        </div>
    </IconContext.Provider>)
}

export default TaskList
