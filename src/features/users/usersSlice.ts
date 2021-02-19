import { createSlice } from '@reduxjs/toolkit';
//import { PayloadAction } from '@reduxjs/toolkit';
import { User } from './types';

const initialState:User[] = 
  [
    { id: '0', name: 'Tianna Jenkins' },
    { id: '1', name: 'Kevin Grant' },
    { id: '2', name: 'Madison Price' }
  ];

  // Warning immutability is obtained with createSclide of RDK
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  }
});

//export const { postAdded, postUpdated } = usersSlice.actions;
//export default usersSlice.reducer;
export const { reducer } = usersSlice; 