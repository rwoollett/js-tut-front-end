import React, { useEffect} from 'react';
import styles from '../scss/labshome.scss';
import { useTypedSelector } from '../features/rootReducer';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { selectAllUsers } from '../features/users/usersSlice';
import { selectAllNotifications, 
         allNotificationsRead } from 
        '../features/notifications/notificationsSlice';
import { useDispatch } from 'react-redux';

const NotificationsList: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const users = useTypedSelector(selectAllUsers);
  const notifications = useTypedSelector(selectAllNotifications);
  
  useEffect( () => {
    dispatch(allNotificationsRead());
  });

  return (<div className={styles['notifications-list']}>
      <h2>Notifications</h2>
      {
        notifications.map( n => {
          const date = parseISO(n.date);
          const timeAgo = formatDistanceToNow(date);
          const user = users.find(user => user.id === n.user) || {
            name: 'Unknown User'
          };
          let styleNotification = `${styles.notification}`;
          if (n.isNew) {
            styleNotification += ` ${styles['is-new']}`;
          }

          return (<div key={n.id} className={styleNotification}>
            <div>
              <b>{user.name}</b> {n.message}
            </div>
            <div title={n.date}>
              <i>{timeAgo} ago</i>
            </div>
          </div>);
        }) 
      }
  </div>);
};

export default NotificationsList;