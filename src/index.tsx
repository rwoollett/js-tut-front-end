import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
require('regenerator-runtime/runtime');
 
ReactDOM.render(
  <React.StrictMode>
    <App title="Front Ends"/>
  </React.StrictMode>,
  document.getElementById('app')
);
