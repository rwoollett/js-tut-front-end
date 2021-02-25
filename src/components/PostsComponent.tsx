import React, { useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../scss/labshome.scss';
import { fetchPosts, 
	selectPostIds, 
	selectPostById } from '../features/posts/postsSlice';
import { useTypedSelector } from '../features/rootReducer';
import AddPostForm from './AddPostForm';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import { ReactionButtons } from './ReactionButton';

interface ExcerptProps {
  postId: string|number;
}
 
let PostExcerpt: React.FC<ExcerptProps> = ({ postId:p }: ExcerptProps) => {
	const post = useTypedSelector(state => selectPostById(state, p));
	let postExcerpt;
	if (post) {
		postExcerpt = (<div>
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
		);
	} else {
		postExcerpt = (<div>
			<p>Post not found</p>
			</div>);
	}
  return (
		<div className={styles.card}>
			{postExcerpt}
		</div>
  );
};

PostExcerpt = memo(PostExcerpt);

function PostsComponent(): JSX.Element {
	const dispatch = useDispatch();
  const orderedPosts = useTypedSelector(selectPostIds);
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
    content = orderedPosts.map( postId => 
		(
			<PostExcerpt key={postId} postId={postId}/>
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
