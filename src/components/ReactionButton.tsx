import React from 'react';
import { Post } from '../features/posts/types';
import { ReactionEmoji } from '../features/types';
import style from '../scss/labshome.scss';
import {useDispatch} from 'react-redux';
import { reactionAdded } from '../features/posts/postsSlice';

const reactionEmoji:ReactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
};

export const ReactionButtons = ({ post }: {post:Post}):JSX.Element => {
  const postCounts = Object.entries(post.reactions);
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button key={name} type="button" 
        className={style["reaction-button"]}
        onClick={() => 
          dispatch(reactionAdded({
            postId: post.id,
            reaction: name
          }))
        }>
        {emoji}&nbsp; 
        { postCounts.map(([pname, ctr]) => {
          if (pname === name) {
            return ctr;
          }
        })}
      </button>
    );
  });

  return <div className={style.reaction}>{reactionButtons}</div>;
};