import { combineReducers } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { reducer as postsReducer} from './posts/postsSlice';
import { reducer as usersReducer} from './users/usersSlice';

export const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
