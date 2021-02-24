import React, { useEffect, memo } from 'react';
import styles from '../scss/labshome.scss';
import { selectAllPosts } from '../features/posts/postsSlice';
import { useTypedSelector } from '../features/rootReducer';
import { fetchPosts } from '../features/posts/postsSlice';
import { useDispatch } from 'react-redux';
import AddPostForm from './AddPostForm';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import { ReactionButtons } from './ReactionButton';
import { Post } from '../features/posts/types';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';

interface ExcerptProps {
  post: Post;
}
 
let PostExcerpt: React.FC<ExcerptProps> = ({ post }: {post:Post}) => {
  return (
		<div className={styles.card}>
			<div>
				<h3>{post.title}</h3>
				<PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
				<p>{post.content.substring(0, 100)}</p>
				<ReactionButtons post={post} />
				<div className={styles['button-container']}>
					<Link to={`/posts/${post.id}`} className="button muted-button">
						View Post
					</Link>				
				</div>
			</div>
	</div>
  );
};

PostExcerpt = memo(PostExcerpt);

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
			<PostExcerpt key={post.id} post={post}/>
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
