import React from 'react';
//import loadable from '@babel/plugin-syntax-dynamic-import';
import styles from '../scss/labshome.scss';
import { useTypedSelector } from '../features/rootReducer';
import { Card } from './Card';
import { AddPostForm } from './AddPostForm';

// const AddPostForm = loadable(() => import("./AddPostForm"), {
//   fallback: <p>Waiting..</p>
// });

function PostsComponent(): JSX.Element {
  const posts = useTypedSelector(state => state.posts);

  return (<div className={styles.posts}>
			<h2>Posts to Popular Laboratories</h2>
			<p>Follow the posts made to Programming Laboratories</p>
			<div className={styles['posts-content']}>
				<AddPostForm />
				<div className={styles['posts-list']}>
					{
						posts.map( (post):JSX.Element => 
							(
								<Card 
								  key={post.id} 
									title={post.title} 
									catchPhrase={post.content.substring(0, 100)}
									link={ {text:"View Post", to:`/posts/${post.id}`}}/>
							)
						) 
					}
			</div>
		</div>
	</div>);
}

export { PostsComponent };
