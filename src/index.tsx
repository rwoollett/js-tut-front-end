import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//requireort "core-js/stable";
require('regenerator-runtime/runtime');
 
ReactDOM.render(
  <React.StrictMode>
    <App title="Front Ends"/>
  </React.StrictMode>,
  document.getElementById('app')
);
