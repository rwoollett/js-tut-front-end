import React, { useEffect } from 'react';
//import loadable from '@babel/plugin-syntax-dynamic-import';
import styles from '../scss/labshome.scss';
import { selectAllPosts } from '../features/rootReducer';
import { useTypedSelector } from '../features/rootReducer';
import { fetchPosts } from '../features/posts/postsSlice';
import { useDispatch } from 'react-redux';
import Card from './Card';
import AddPostForm from './AddPostForm';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import { ReactionButtons } from './ReactionButton';

// const AddPostForm = loadable(() => import("./AddPostForm"), {
//   fallback: <p>Waiting..</p>
// });

function PostsComponent(): JSX.Element {
	const dispatch = useDispatch();
  const posts = useTypedSelector(selectAllPosts);
	const postStatus = useTypedSelector(state => state.posts.status);
	const error = useTypedSelector(state => state.posts.error);

	useEffect(() => {
		if (postStatus === 'idle') {
			dispatch(fetchPosts());
		}
	}, [postStatus, dispatch]);

	let content;

  if (postStatus === 'loading') {
    content = <div className={styles.loader}>Loading...</div>;

  } else if (postStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
		const orderedPosts = posts.slice().sort(
			(a, b) => b.date.localeCompare(a.date));

    content = orderedPosts.map( (post):JSX.Element => 
		(
			<Card key={post.id}	title={post.title} 
			catchPhrase={post.content.substring(0, 100)} 
			link={ {text:"View Post", to:`/posts/${post.id}`}}
			author={<PostAuthor userId={post.user}/>}
			timeAgo={<TimeAgo timestamp={post.date}/>}
			reactEmoji={<ReactionButtons post={post}/>}
			/>
		));

	} else if (postStatus === 'failed') {
    content = <div>{error}</div>;

	}

  return (<div className={styles.posts}>
			<h2>Posts to Popular Laboratories</h2>
			<p>Follow the posts made to Programming Laboratories</p>
			<div className={styles['posts-content']}>
				<AddPostForm />
				<div className={styles['posts-list']}>
					{content}
			</div>
		</div>
	</div>);
}

export default PostsComponent;
