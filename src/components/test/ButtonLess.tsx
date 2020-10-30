import React from 'react'
import { Action } from './CounterApp'

const ButtonLess = ({ dispatch }: { dispatch: React.Dispatch<Action> }) => {
    return (
        <button
            type="button"
            onClick={() => dispatch(Action.Decrement)}
        >
            Substract One
        </button>
    )
}

export default ButtonLess
