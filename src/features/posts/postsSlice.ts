import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { Post } from './types';

const initialState:Post[] = 
  [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
  ];

// Warning on reducer immutabiliy:
// Using createSlice its "Safe" to call mutating functions like
//  Array.push() or modify object fields like 
//  state.someField = someValue inside of createSlice()
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action: PayloadAction<Post>) {
      state.push(action.payload);
    }
  }
});

export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;