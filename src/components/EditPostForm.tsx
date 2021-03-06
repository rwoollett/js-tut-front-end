import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from '../features/rootReducer';
import { selectPostById } from '../features/posts/postsSlice';
import { updatePost } from '../features/posts/postsSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import style from '../scss/labshome.scss';
import PropTypes from 'prop-types';

interface MatchProps {
  params: { postId: string }
}

const EditPostForm: React.FC<{ match: MatchProps }> = (
  { match }) => {

  const { postId } = match.params;

  const post = useTypedSelector(state => selectPostById(state, postId));

  const [title, setTitle] = useState(post ? post?.title : "");
  const [content, setContent] = useState(post ? post?.content : "");

  const user = post ? post?.user : "";
  const date = post ? post?.date : "";
  const reactions = post ? post?.reactions : {
    thumbsUp: 0,
    hooray: 0,
    heart: 0,
    rocket: 0,
    eyes: 0
  };

  //const dispatch = useDispatch();
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const onSavePostClicked = async () => {
    if (title && content) {
      try {
        const resultAction = await dispatch(
          updatePost({ id: postId, title, content, user, date, reactions })
        );
        unwrapResult(resultAction);
        setTitle('');
        setContent('');
        history.push(`/posts/${postId}`);
      } catch (err) {
        console.error('Failed to save the post: ', err);
      }
    }
  };

  return (
    <div className={style.card}>
      <div className={style['post']}>
        <form>
          <label htmlFor="postTitle">Post Title</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />

          <label htmlFor="postContent">Content</label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          />
          <div className={style['button-container']}>
            <button type="button" onClick={onSavePostClicked}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditPostForm.propTypes = {
  match: PropTypes.exact({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.exact({
      postId: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default EditPostForm;