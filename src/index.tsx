import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
 
import './api/server';

ReactDOM.render(
  <React.StrictMode>
    <App title="Front Ends"/>
  </React.StrictMode>,
  document.getElementById('app')
);
