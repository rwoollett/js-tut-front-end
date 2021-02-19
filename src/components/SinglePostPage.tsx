import React from 'react';
import { useTypedSelector } from '../features/rootReducer';
import style from '../scss/labshome.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SinglePostPage: React.FC<{match: {params:{postId:string}}}> = (
    {match}): JSX.Element => {
      
  const { postId } = match.params;

  const post = useTypedSelector(state =>
    state.posts.find(post => post.id === postId)
  );

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <div className={style.card}>
      <div className={style['post']}>
        <h2>{post.title}</h2>
        <p className={style["post-content"]}>{post.content}</p>
        <Link to={`/editPost/${post.id}`}>Edit Post</Link>
      </div>
    </div>
  );
};


SinglePostPage.propTypes = {
  match: PropTypes.exact( {
    params: PropTypes.exact( {
      postId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired 
};

export default SinglePostPage;