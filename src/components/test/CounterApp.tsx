import React, { useReducer } from 'react'
import ButtonLess from './ButtonLess';
import ButtonPlus from './ButtonPlus';
import ButtonReset from './ButtonReset';


enum Action {
    Increment,
    Decrement,
    Reset
}

//Allow to know what type contains my reducer. With this mode is easier to access to the properties
type State = {
    counter: number
}

const initialState: State = { counter: 0 };

const reducer = (state: State, action: Action): State => {
    switch (action) {
        //Increment the counter by one 
        case Action.Increment:
            return { counter: state.counter + 1 }
        //Decrement the counter by one
        case Action.Decrement:
            return { counter: state.counter - 1 }
        //Reset the counter to zero
        case Action.Reset:
            return { counter: state.counter = 0 }
        default:
            throw new Error('Missing action. Please update Action enum')
    }
}

const CounterApp = () => {

    //state: Contains the current value
    //dispatch: Allow to call the function stored in reducer
    //reducer: Contains all functions to change the State
    //initialState: Contains the initial object. (Must be an object)
    const [{ counter }, dispatch] = useReducer(reducer, initialState)

    return (
        <>
            <h1>This is the counter app</h1>
            <br />
            <h4>Counter {counter}</h4>
            <br />
            {/* Using the new method */}
            <ButtonLess dispatch={dispatch} />
            <ButtonReset dispatch={dispatch} />
            <ButtonPlus dispatch={dispatch} />
        </>
    )
}

export {
    CounterApp as default,
    Action
}
