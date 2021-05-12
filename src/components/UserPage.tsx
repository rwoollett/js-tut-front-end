import React from 'react';
import { selectUserById } from '../features/users/usersSlice';
import { selectPostsByUser } from '../features/posts/postsSlice';
import { useTypedSelector } from '../features/rootReducer';
import style from '../scss/labshome.scss';
import '../scss/labshome.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserPage: React.FC<{match: {params:{userId:string}}}> = (
    {match}): JSX.Element => {
      
  const { userId } = match.params;

  const user = useTypedSelector(state => selectUserById(state, userId));
  // A memoized selector usage...
  const postsForUser = useTypedSelector(
    state => selectPostsByUser(state, userId));
  

  if (!user) {
    return (
      <section>
        <h2>User not found!</h2>
      </section>
    );
  }

  return (
    <div className={style.card}>
      <div className={style['user-card']}>
        <h2>{user.name}</h2>
        <ul>
          {
            postsForUser.map( post => (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};


UserPage.propTypes = {
  match: PropTypes.exact( {
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.exact( {
      userId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired 
};

export default UserPage;