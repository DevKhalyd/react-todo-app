import React from 'react'
import { Action } from './CounterApp'

const ButtonPlus = ({ dispatch }: { dispatch: React.Dispatch<Action> }) => {

    return (
        <button
            type="button"
            onClick={() => dispatch(Action.Increment)}
        >Add One</button>
    )
}

export default ButtonPlus
