import React from 'react';
import {useTypedSelector} from '../features/rootReducer';
import {selectUserById } from '../features/users/usersSlice';
import style from '../scss/labshome.scss';

const PostAuthor = ({ userId }: { userId:string}):JSX.Element => {
  const author = useTypedSelector(state => selectUserById(state, userId));
  return (<span className={style.author}>by {
    author ? author.name : 'Unknown author'}</span>);
};

export default PostAuthor;