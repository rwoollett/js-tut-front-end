import React from 'react';
import { selectedPostById, useTypedSelector } from '../features/rootReducer';
import style from '../scss/labshome.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import {ReactionButtons} from './ReactionButton';

const SinglePostPage: React.FC<{match: {params:{postId:string}}}> = (
    {match}): JSX.Element => {
      
  const { postId } = match.params;

  const post = useTypedSelector(state => selectedPostById(state, postId));

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
        <PostAuthor userId={post.user}/>
        <TimeAgo timestamp={post.date}/>
        <p className={style["post-content"]}>{post.content}</p>
        <ReactionButtons post={post}/>
        <div className={style['button-container']}>
          <Link to={`/editPost/${post.id}`}>Edit Post</Link>
        </div>
      </div>
    </div>
  );
};


SinglePostPage.propTypes = {
  match: PropTypes.exact( {
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.exact( {
      postId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired 
};

export default SinglePostPage;