import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
//Using the css to give style to the main index page (html)
//TODO: Change this path to current
import './styles/css/index.css';
/**
 * Run the application
 * 
 */

ReactDOM.render(
  //This tag will show warn if there is some bad practice in the console
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

