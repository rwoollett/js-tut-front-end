import { createSlice, nanoid } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { Post, ReactPost } from './types';
import { sub } from 'date-fns';
import { ReactionEmojiCount } from '../types';

const reactionEmojiCount:ReactionEmojiCount = {
  thumbsUp: 0,
  hooray: 0,
  heart: 0,
  rocket: 0,
  eyes: 0
};

const initialState:Post[] = 
  [
    { id: '1', title: 'First Post!', content: 'Hello!', user:'2',
     date:sub(new Date(), { minutes: 10 }).toISOString(),
     reactions: reactionEmojiCount },
    { id: '2', title: 'Second Post', content: 'More text', user:'2',
     date:sub(new Date(), { minutes: 5 }).toISOString(),
     reactions: reactionEmojiCount },
    { id: '3', title: 'Third Post', content: 'More text', user:'1',
     date:sub(new Date(), { minutes: 1 }).toISOString(),
     reactions: reactionEmojiCount }
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
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action: PayloadAction<ReactPost>) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find(post => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload);
      },
      prepare(title: string, content: string, user: string) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            user,
            title,
            content,
            reactions: reactionEmojiCount
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

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
export const { reducer } = postsSlice; 