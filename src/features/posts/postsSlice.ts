import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post, ReactPost, PostsState } from './types';
import './types';
import { client } from '../../api/client';

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

const initialState = 
  {
    entries: [],
    status: 'idle',
    error: undefined
} as PostsState;

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts', 
  async () =>  {
    const response = await client.get('/fakeApi/posts');
    return await response.posts;
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  // The payload creator receives the partial `{title, content, user}` object
  async ({title, content, user}: 
      {title: string, content: string, user: string}) => {
    // We send the initial data to the fake API server
    const response = await client.post('/fakeApi/posts', 
      { post: {title, content, user} });
    // The response includes the complete post object, including unique ID
    console.log('Response post:', response.post, typeof response.post);
    return response.post;
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // postAdded: {
    //   reducer(state, action: PayloadAction<Post>) {
    //     state.entries.push(action.payload);
    //   },
    //   prepare(title: string, content: string, user: string) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         date: new Date().toISOString(),
    //         user,
    //         title,
    //         content,
    //         reactions: reactionEmojiCount
    //       }
    //     };
    //   }
    // },
    reactionAdded(state, action: PayloadAction<ReactPost>) {
      const { postId, reaction } = action.payload;
      const existingPost = state.entries.find(post => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    postUpdated(state, action: PayloadAction<Post>) {
      const { id, title, content } = action.payload;
      const existingPost = state.entries.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.status = 'loading';
    }),
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.entries = state.entries.concat(action.payload);
    }),
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }),
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      state.entries.push(action.payload);
    });
  }
});

export const { postUpdated, reactionAdded } = postsSlice.actions;
export const { reducer } = postsSlice; 
