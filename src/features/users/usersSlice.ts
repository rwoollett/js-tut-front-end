import { createSlice, 
  createAsyncThunk,
  createEntityAdapter, 
  EntityState} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { client } from '../../api/client';
import { User } from './types';

const usersAdapter = createEntityAdapter<User>({
  selectId: user => user.id,
});

const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users');
  return response.users;
});

  // Warning immutability is obtained with createSclide of RDK
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
  }
});

export const { reducer } = usersSlice; 

// Users selectors
type CS = CombinedState<{ users: EntityState<User>; }>
export const { 
  selectAll:selectAllUsers,
  selectById: selectUserById
 } = usersAdapter.getSelectors<CS>(state => state.users);
  