import { combineReducers } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { reducer as postsReducer} from './posts/postsSlice';
import { reducer as usersReducer} from './users/usersSlice';
import { reducer as notificationsReducer} 
  from './notifications/notificationsSlice';

export const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
  notifications: notificationsReducer
});

type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
