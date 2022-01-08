
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';
import { fetchUsers } from './features/users/usersSlice';

store.dispatch(fetchUsers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <pre>
            {JSON.stringify(window.ENV, null, 2)}
          </pre>
      <App title="Front Ends"/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
);
