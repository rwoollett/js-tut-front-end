import { createSlice, nanoid } from '@reduxjs/toolkit';
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

// The reducer object of actions uses PayloadAction<..> to explicit
// declare the actions. name of action is the type is:
// slice name/action method name.
// eg. Post is the payload for postAdded
// CreateSlice lets us define a "prepare callback" 
// function for action.payload
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload);
      },
      prepare(title: string, content: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            content
          }
        };
      }
    },
    postUpdated(state, action: PayloadAction<Post>) {
      const { id, title, content } = action.payload;
      const existingPost = state.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    }
  }
});

export const { postAdded, postUpdated } = postsSlice.actions;
export default postsSlice.reducer;