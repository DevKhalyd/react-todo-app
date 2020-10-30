import React from 'react'
import { Action } from './CounterApp'

const ButtonReset = ({ dispatch }: { dispatch: React.Dispatch<Action> }) => {
    return (
        <button
            type="button"
            onClick={() => dispatch(Action.Reset)}
        >Reset to zero</button>
    )
}

export default ButtonReset
