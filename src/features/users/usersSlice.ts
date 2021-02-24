import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';
import { User } from './types';
import { CombinedState } from 'redux';


const initialState:User[] = [];

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
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      //state.fill(action.payload);
      return action.payload;
    });
  }
});

//export const { postAdded, postUpdated } = usersSlice.actions;
//export default usersSlice.reducer;
export const { reducer } = usersSlice; 

  // Users selectors
  export const selectAllUsers = (
    state:CombinedState<{ users: User[];}>):User[] => state.users;

  export const selectUserById = (
    state:CombinedState<{ users: User[];}>, userId:string):User|undefined =>
      state.users.find(user => user.id === userId);
  