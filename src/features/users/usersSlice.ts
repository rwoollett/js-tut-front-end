import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityState
} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { User } from './types';
import { HttpResponse, http } from '../fetchData';

const usersAdapter = createEntityAdapter<User>({
  selectId: user => user.id,
});

const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response: HttpResponse<User[]> = await http<User[]>('/api/v1/users', { method: "GET" });
  if (response.parsedBody) {
    return response.parsedBody;
  } else {
    return Promise.reject("Could not parse fetch");
  }
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
  selectAll: selectAllUsers,
  selectById: selectUserById
} = usersAdapter.getSelectors<CS>(state => state.users);
