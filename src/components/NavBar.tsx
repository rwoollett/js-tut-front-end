import React from 'react';
import { Link } from 'react-router-dom';
import style from '../scss/labshome.scss';
//import * as Logo from '../scss/images/logo.svg';
import { useDispatch } from 'react-redux';
import { useTypedSelector} from '../features/rootReducer';
import { fetchNotifications, selectAllNotifications } 
  from '../features/notifications/notificationsSlice';

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const notifications = useTypedSelector(selectAllNotifications);
  const numUnreadNotifications = notifications.filter(n => !n.read).length;

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  };
  
  let unreadNotificationsBadge;

  if (numUnreadNotifications > 0) {
    unreadNotificationsBadge = (
      <span className={style.badge}>{numUnreadNotifications}</span>
    );
  }

  return (
    <div className={style["navbar-minimal"]}>
      {/* <img src={ Logo.default }/> */}
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <Link to="/notifications">
        Notifications{unreadNotificationsBadge}
      </Link>
      <div className={style['button-container']}>
        <button onClick={fetchNewNotifications}>
          Refresh Notifications
        </button>
      </div>
    </div>);

};

export default NavBar ;