import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from '../features/rootReducer';
import { postUpdated } from '../features/posts/postsSlice';
import style from '../scss/labshome.scss';

export const EditPostForm: React.FC<{match: {params:{postId:string}}}> = (
    {match}) => {

  const { postId } = match.params;

  const post = useTypedSelector(state => 
    state.posts.find(post => post.id === postId));

  const [title, setTitle] = useState(post ? post?.title : "");
  const [content, setContent] = useState(post ? post?.content: "");

  const dispatch = useDispatch(); //Todo check TS
  const history = useHistory();

  const onTitleChanged = (e:React.ChangeEvent<HTMLInputElement>) => 
      setTitle(e.target.value);
  const onContentChanged = (e:React.ChangeEvent<HTMLTextAreaElement>) => 
      setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }));
      history.push(`/posts/${postId}`);
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
          <button type="button" onClick={onSavePostClicked}>Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditPostForm;