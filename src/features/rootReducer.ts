import { combineReducers } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { reducer as postsReducer} from './posts/postsSlice';
import { Post } from './posts/types';
import { reducer as usersReducer} from './users/usersSlice';

export const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

// Posts selectors
export const selectAllPosts = (state:RootState):Post[] => state.posts.entries;
export const selectedPostById = (
  state:RootState, postId:string):Post|undefined => 
  state.posts.entries.find(post => post.id === postId);