import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../scss/labshome.scss';
import { useTypedSelector } from '../features/rootReducer';
import { selectAllUsers } from '../features/users/usersSlice';

const UsersList: React.FC = (): JSX.Element => {
  const users = useTypedSelector(selectAllUsers);

  return (<div className={styles.users}>
    <h2>Users</h2>
    <ul>
      {
        users.map( user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        )) 
      }
    </ul>
  </div>);
};

export default UsersList;