import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';
import { Notification } from './types';
import { CombinedState } from 'redux';

const initialState:Notification[] = [];

export const selectAllNotifications = 
    (state:CombinedState<{
                notifications: Notification[];
            }> ):Notification[] => state.notifications;

export const fetchNotifications = createAsyncThunk<
   Notification[],
   void,
   {
     state: CombinedState<{
      notifications: Notification[];
  }>
   }>
   (
  'notifications/fetchNotifications', 
  async (_, { getState }) => {
    console.log("async notis 1");
    const allNotifications = selectAllNotifications(getState());
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.date : '';
    console.log("async notis 2", latestTimestamp);
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    );
    console.log("async notis 2", response);
    return response.notifications;
  }
);

  // Warning immutability is obtained with createSclide of RDK
export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    allNotificationsRead(state/*, action:unknown*/) {
      state.forEach(n => {
        n.read = true;
      });
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.forEach(notification => {
        // Any notifications we've read are no longer new
        notification.isNew = !notification.read;
      });
      state.push(...action.payload);
      // Sort with newest first
      state.sort((a, b) => b.date.localeCompare(a.date));
    });
  }
});

export const { allNotificationsRead } = notificationsSlice.actions;
export const { reducer } = notificationsSlice; 
