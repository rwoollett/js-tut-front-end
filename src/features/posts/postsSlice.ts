import {
  PayloadAction,
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
  EntityState
} from '@reduxjs/toolkit';
import { Post, ReactPost } from './types';
import { CombinedState } from 'redux';
import { http } from '../fetchData';


// Entity adaptor for normalised posts structure; ids end entities.
const postsAdapter = createEntityAdapter<Post>({
  selectId: post => post.id,
  sortComparer: (a, b) => b.date.localeCompare(a.date)
});

interface PostAdaptorProp {
  status: string;
  error?: string
}
const initialState = postsAdapter.getInitialState(
  { status: 'idle' } as PostAdaptorProp);

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    let apiUrl = '';
    if (window.ENV) {
      apiUrl = window.ENV.APP_API;
    }
    console.log("Base api url", apiUrl);
    ////https://rwlltt-posts-idbnqj5ocq-uw.a.run.app/persons
    //return await http<Post[]>('http://localhost:8082/api/v2/posts', { method: "GET" });
    return await http<Post[]>(
      `${apiUrl}/api/v1/posts`, 
      { method: "GET" }
      );
    //return await http<Post[]>('/api/v1/posts', { method: "GET" });
  });

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  // The payload creator receives the partial `{title, content, user}` object
  async ({ title, content, user }:
    { title: string, content: string, user: string }) => {
    // We send the initial data to the fake API server
    const reqInit = {
      body: JSON.stringify({ post: { title, content, user } }),
      method: "POST"
    };
    return await http<Post>('/api/v1/posts', reqInit);
    // The response includes the complete post object, including unique ID
    // console.log('Response post:', response.post, typeof response.post);
    // return response.post;
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  // The payload creator receives the partial `{title, content, user}` object
  async ({ id, title, content, user, date, reactions }: Post) => {
    //  { id: string, title: string, content: string }) => {
    // We send the data to the fake API server
    const reqInit = {
      body: JSON.stringify({
        post: { id, title, content, user, date, reactions }
      }),
      method: "PUT"
    };
    console.log('Response before put:', reqInit);
    const response = await http<Post>('/api/v1/posts', reqInit);
    // The response includes the complete post object, including unique ID
    console.log('Response put:', response, typeof response);
    return response;
  }
);

// Warning on reducer immutabiliy:
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action: PayloadAction<ReactPost>) {
      const { postId, reaction } = action.payload;
      const existingPost = state.entities[postId];
      if (existingPost) {
        // immer functionality for immutability
        existingPost.reactions[reaction]++;
      }
    },
    // postUpdated(state, action: PayloadAction<Post>) {
    //   const { id, title, content } = action.payload;
    //   const existingPost = state.entities[id];
    //   if (existingPost) {
    //     // immer functionality for immutability
    //     existingPost.title = title;
    //     existingPost.content = content;
    //   }
    // }
  },
  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, (state, _action) => {
      state.status = 'loading';
    }),
      builder.addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        // Use the `upsertMany` reducer as a mutating update utility
        postsAdapter.upsertMany(state, action.payload);
      }),
      builder.addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }),
      builder.addCase(addNewPost.fulfilled, postsAdapter.addOne),
      builder.addCase(updatePost.fulfilled, (state, action) => {
        const { id, title, content } = action.payload;
        const existingPost = state.entities[id];
        if (existingPost) {
          // immer functionality for immutability
          existingPost.title = title;
          existingPost.content = content;
        }

      });
  }
});
//postUpdated,
export const { reactionAdded } = postsSlice.actions;
export const { reducer } = postsSlice;

// Posts selectors
type CS = CombinedState<{
  posts: EntityState<Post> & PostAdaptorProp;
}>;

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors<CS>(state => state.posts);

// Memoized selector - input selectors+ to one selectors output.
export const selectPostsByUser = createSelector(
  [selectAllPosts, (_: CS, userId: string) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
);