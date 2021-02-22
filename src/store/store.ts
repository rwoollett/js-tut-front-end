import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../features/rootReducer';

const store = configureStore({
  reducer: rootReducer
});

export default store;
export type AppDispatch = typeof store.dispatch;


//import { createStore, applyMiddleware } from 'redux';
//import searchReducer from './reducer';
//import thunk from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension';
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