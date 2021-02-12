//import { createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
//import searchReducer from './reducer';
//import thunk from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension';

import { rootReducer } from '../features/rootReducer';

export default configureStore({
  reducer: rootReducer
});

// const store = configureStore(
//   { reducer: searchReducer
//     });

//   // const store = configureStore(
//   //   { reducer: {
//   //       search: searchReducer
//   //     }});
    
// export default store;
// export type Store = typeof store.dispatch;

//export default createStore(searchReducer, 
//  composeWithDevTools(applyMiddleware(thunk)));