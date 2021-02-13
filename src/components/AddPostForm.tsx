import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAdded } from '../features/posts/postsSlice';

export const AddPostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const onTitleChanged = (e:React.ChangeEvent<HTMLInputElement>) => 
      setTitle(e.target.value);
  const onContentChanged = (e:React.ChangeEvent<HTMLTextAreaElement>) => 
      setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content));
      setTitle('');
      setContent('');
    }
  };
      
  return (
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
        <button type="button" onClick={onSavePostClicked}>Save</button>
      </form>
  );
};