import React from 'react';
import {useTypedSelector} from '../features/rootReducer';
import style from '../scss/labshome.scss';

const PostAuthor = ({ userId }: { userId:string}):JSX.Element => {
  const author = useTypedSelector(state => 
    state.users.find(user => user.id === userId));
  return (<span className={style.author}>by {
    author ? author.name : 'Unknown author'}</span>);
};

export default PostAuthor;