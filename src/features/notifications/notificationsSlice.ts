import { createSlice, 
  createAsyncThunk,
  createEntityAdapter, 
  EntityState} from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import { client } from '../../api/client';
import { Notification } from './types';

const notificationsAdapter = createEntityAdapter<Notification>({
  selectId: n => n.id,
  sortComparer: (a, b) => b.date.localeCompare(a.date)  
});
const initialState = notificationsAdapter.getInitialState();

type CS = CombinedState<{ 
  notifications: EntityState<Notification>;}>;

export const fetchNotifications = createAsyncThunk<
   Notification[], void, { state: CS }> (
  'notifications/fetchNotifications', 
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState());
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.date : '';
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    );
    return response.notifications;
  }
);

  // Warning immutability is obtained with createSclide of RDK
export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    allNotificationsRead(state/*, action:unknown*/) {
      Object.values(state.entities).forEach(n => {
        if (n) {
          n.read = true;
        }
      });
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      Object.values(state.entities).forEach(n => {
        // Any notifications we've read are no longer new
        if (n) {
          n.isNew = !n.read;
        }
      });
      notificationsAdapter.upsertMany(state, action.payload);
    });
  }
});

export const { allNotificationsRead } = notificationsSlice.actions;
export const { reducer } = notificationsSlice; 

export const {
  selectAll: selectAllNotifications
} = notificationsAdapter.getSelectors<CS>(state => state.notifications);

