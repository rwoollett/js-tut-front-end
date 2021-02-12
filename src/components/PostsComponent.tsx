import React from 'react';
import styles from '../scss/labshome.scss';
import { useTypedSelector } from '../features/rootReducer';
import Card from './Card';
import { AddPostForm } from './AddPostForm';

function PostsComponent(): JSX.Element {
	//const [query, setQuery] = useState("");
  const posts = useTypedSelector(state => state.posts);

	//const dispatch = useDispatch();

  return (<div className={styles.popular}>
      <AddPostForm />
			<h2>Posts to Popular Laboratories</h2>
			<div className={styles['home-nav']}>
			{
				posts.map( (post):JSX.Element => 
					(
						<Card key={post.id} title={post.title} catchPhrase={post.content}/>
					)
				) 
			}
		</div>
	</div>);
}

export default PostsComponent;


// export const PostsList = () => {

//   const renderedPosts = posts.map(post => (
//     <article className="post-excerpt" key={post.id}>
//       <h3>{post.title}</h3>
//       <p className="post-content">{post.content.substring(0, 100)}</p>
//     </article>
//   ))

//   return (
//     <section className="posts-list">
//       <h2>Posts</h2>
//       {renderedPosts}
//     </section>
//   )
// }