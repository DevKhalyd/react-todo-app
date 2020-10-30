# TODO APP

The following notes are mines. What I've learned in this project. These notes are mixed with my comments and docs from [React Docs](https://reactjs.org/)

The project was build on TypeScript

# Index

This doc is split in a few parts. Check it:

- [Reat Part](#react)
- [CSS Part](#css)
- [Link part of the same document](#link-part-of-the-same-document)
- [About me](#about-me)

## React

Here begins the React part

### `StrictMode` TAG

`StrictMode` is a tool for highlighting potential problems in an application. Like `Fragment`, `StrictMode` does not render any visible UI. It activates additional checks and warnings for its descendants.

**For example**

```typescript
import React from "react";

function ExampleApplication() {
  return (
    <>
      <Header />
      <React.StrictMode>
        <div>
          //These components will contain the checks
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </>
  );
}
```

In the above example, **strict mode checks will not be run against the Header and Footer components.** However, **ComponentOne and ComponentTwo**, as well as all of their descendants,**will have the checks.**

**`StrictMode` currently helps with:**

- Identifying components with unsafe lifecycles
- Warning about legacy string ref API usage
- Warning about deprecated findDOMNode usage
- Detecting unexpected side effects
- Detecting legacy context API

More info in its [docs](https://reactjs.org/docs/strict-mode.html)

### Hooks and variants

Here is some new hooks to learn

#### `useContext`

In summary, the `useContext` allow to share data between components without passing in the props, just subscribing to the context to `listen` the changes about that property

**Create the context**

The context should be created in another file to call in another components

```typescript
//This value only will be taken when there is not a value from the Provider
const MyContext = React.createContext(defaultValue);
```

Creates a Context object. When React renders a component that subscribes to this Context object it will read the current context value from the closest matching Provider above it in the tree.

The `defaultValue` argument is only used when a component does not have a matching Provider above it in the tree. This can be helpful for testing components in isolation without wrapping them. **Note: passing undefined as a Provider value does not cause consuming components to use defaultValue.**

```tsx
<!---Always wrap with a Provider to allow listen the changes for the children components-->
<MyContext.Provider value={/* assign value */}>
```

The Provider component accepts a value prop to be passed to consuming components that are descendants of this Provider. One Provider can be connected to many consumers. Providers can be nested to override values deeper within the tree.

Every Context object comes with a Provider React component that allows consuming components to subscribe to context changes.

All **consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes.** The propagation from Provider to its descendant consumers (including .contextType and useContext) is not subject to the shouldComponentUpdate method, so **the consumer is updated even when an ancestor component skips an update.**

**Example with only those values (Example with a class)**

```javascript
// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current theme (with "light" as the default).
const ThemeContext = React.createContext("light");

class App extends React.Component {
  render() {
    // Use a Provider to pass the current theme to the tree below.
    // Any component can read it, no matter how deep it is.
    // In this example, we're passing "dark" as the current value.
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // Assign a contextType to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

##### Context.Consumer `useContext`

A React component that subscribes to context changes. This lets you subscribe to a context within a function component.

**Example**

```tsx
//MyContext refers to the context created before
<MyContext.Consumer>
  {value => /* render something based on the context value */}
</MyContext.Consumer>
```

**Requires a function as a child.** The function receives the current context value and returns a React node. The value argument passed to the function will be equal to the value prop of the closest Provider for this context above in the tree. **If there is no Provider for this context above, the value argument will be equal to the defaultValue that was passed to createContext().**

See info about [_function as a child_](https://reactjs.org/docs/render-props.html)

##### Example

File that contains only the theme with the values to use

**theme-context.js**

```tsx
//Themes that can be used
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

//ThemeContext
const ThemeContext = React.createContext(
  themes.dark // default value
);

export { themes, ThemeContext };
```

Implement the values created
**app.js**

```tsx
//Import the context created with the data to use
import { ThemeContext, themes } from "./theme-context";
import ThemedButton from "./themed-button";

/*Do something...*/
```

#### Updating Context from a Nested Component (Context)

It is often necessary to update the context from a component that is nested somewhere deeply in the component tree. In this case you can pass a function down through the context to allow consumers to update the context:

_Example_

Creating the context with the function
**theme-context.ts**

```ts
export const ThemeContext = React.createContext({
  theme: themes.dark,
  //Function to use
  toggleTheme: () => {},
});
```

Implement the theme context

**theme-button.ts**

```tsx
//Use the theme context
import { ThemeContext } from "./theme-context";

function ThemeTogglerButton() {
  // The Theme Toggler Button receives not only the theme
  // but also a toggleTheme function from the context
  return (
    //Using the consumer to listen changes
    <ThemeContext.Consumer>
      {/*Destructuring ThemeContext*/}
      {({ theme, toggleTheme }) => (
        <button

      {/*Assign values*/}
          onClick={toggleTheme}
          style={{ backgroundColor: theme.background }}
        >
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeTogglerButton;
```

Using the provider context

**app.js**

```tsx
//Import libraries to use
import { ThemeContext, themes } from "./theme-context";
import ThemeTogglerButton from "./theme-toggler-button";

/*
  Some code...
*/

render() {
    // The entire state is passed to the provider
    return (
      {/*Or implement own values*/}
      <ThemeContext.Provider value={ThemeContext}>
        <Content />
      </ThemeContext.Provider>
    );
  }
}
```

All the examples work with classes

This example work with the hook `useContext`

```tsx
//All this code is the same
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

//Just change in this part
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

See more info about how to consume multiple contexts [here](https://reactjs.org/docs/context.html#consuming-multiple-contexts)

#### `useReducer`

`useReducer` is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. `useReducer` **also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.**

**Example**

This file contains the implementation about useReducer
**CounterApp.tsx**

```tsx
import React, { useReducer } from "react";
import ButtonLess from "./ButtonLess";
import ButtonPlus from "./ButtonPlus";
import ButtonReset from "./ButtonReset";

//Action not necessary should be a enum would can be `any`
//For situations more complex this can be an object
enum Action {
  Increment,
  Decrement,
  Reset,
}

//Allow to know what type contains my reducer. With this mode is easier to access to the properties
type State = {
  counter: number;
};

const initialState: State = { counter: 0 };

const reducer = (state: State, action: Action): State => {
  switch (action) {
    //Increment the counter by one
    case Action.Increment:
      return { counter: state.counter + 1 };
    //Decrement the counter by one
    case Action.Decrement:
      return { counter: state.counter - 1 };
    //Reset the counter to zero
    case Action.Reset:
      return { counter: state.counter = 0 };
    default:
      throw new Error("Missing action. Please update Action enum");
  }
};

const CounterApp = () => {
  //state: Contains the current value
  //dispatch: Allow to call the function stored in reducer
  //reducer: Contains all functions to change the State
  //initialState: Contains the initial object. (Must be an object)
  const [{ counter }, dispatch] = useReducer(reducer, initialState);

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
  );
};

export { CounterApp as default, Action };
```

Implementation

**SumByOneButton.tsx**

```tsx
import React from "react";
import { Action } from "./CounterApp";

const ButtonReset = ({ dispatch }: { dispatch: React.Dispatch<Action> }) => {
  return (
    <button type="button" onClick={() => dispatch(Action.Reset)}>
      Reset to zero
    </button>
  );
};

export default ButtonReset;
```

## CSS

Here begins the CSS part

### Gradients

```css
/* Styles the page */
body {
  /* Create a gradient that goes from left to right */

  background-image: linear-gradient(to right, red, yellow, green, purple);

  /* Create a gradient that goes from left to right with two colors*/
  background-image: linear-gradient(
    to right,
    rgba(255, 0, 0, 0.1),
    rgba(255, 0, 0, 1)
  );
}
```

### SASS

SASS is a preprocessor that helps to write CSS code more clean and readable

Read it's [docs](https://sass-lang.com/install)

### How to set up?

Read this article to set up [SASS](https://medium.com/@lauralouisetobin/how-to-run-sass-in-the-command-line-8962b9feaea2)

Just have to add a script in the node.json (file to set up all in react)

Watch in [dirs](https://sass-lang.com/guide)

## Link part of the same document

`[Custom foo description](#foo)`

**Linked to**

`# Foo`

In the above case, the Foo header has generated an anchor tag with the name foo

Note: just one # for all heading sizes, no space between # and anchor name, anchor tag names must be lowercase, and delimited by dashes if multi-word.

Example taked from [this](https://stackoverflow.com/questions/2822089/how-to-link-to-part-of-the-same-document-in-markdown) Stackoverflow answer

## Libraries

[Local storage](https://www.npmjs.com/package/local-storage)

This documentation is very helpful. Just read how to save the data. With TS is easier

# About me

I'm a Web and Mobile developer. Always trying to learn something new to implement to my projects. I'm a spanish speaker native and trying to learn the English language
