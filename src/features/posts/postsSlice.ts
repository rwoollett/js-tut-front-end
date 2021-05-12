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
import { HttpResponse, http } from '../fetchData';


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
    const response: HttpResponse<Post[]> = await http<Post[]>('/api/v1/posts', { method: "GET" });
    if (response.parsedBody) {
      return response.parsedBody;
    } else {
      return Promise.reject("Could not parse fetch");
    }
  });

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  // The payload creator receives the partial `{title, content, user}` object
  async ({ title, content, user }:
    { title: string, content: string, user: string }) => {
    // We send the initial data to the fake API server
    // const response = await client.post('/fakeApi/posts', 
    //   { post: {title, content, user} });
    const reqInit = {
      body: JSON.stringify({ post: {title, content, user }}),
      method: "POST"
    };
    const response: HttpResponse<Post> = await http<Post>('/api/v1/posts', reqInit);
    if (response.parsedBody) {
      return response.parsedBody;
    } else {
      return Promise.reject("Could not parse fetch");
    }
    // The response includes the complete post object, including unique ID
    //    console.log('Response post:', response.post, typeof response.post);
    //    return response.post;
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
    postUpdated(state, action: PayloadAction<Post>) {
      const { id, title, content } = action.payload;
      const existingPost = state.entities[id];
      if (existingPost) {
        // immer functionality for immutability
        existingPost.title = title;
        existingPost.content = content;
      }
    }
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
      builder.addCase(addNewPost.fulfilled, postsAdapter.addOne);
  }
});

export const { postUpdated, reactionAdded } = postsSlice.actions;
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