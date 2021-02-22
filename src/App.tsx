import { hot } from 'react-hot-loader/root';
import React from 'react';
import HomePage from './components/HomePage';
import SinglePostPage  from './components/SinglePostPage';
import EditPostForm  from './components/EditPostForm';
import NavBar from './components/NavBar';
import style from './scss/labshome.scss';
import { client } from './api/client';
import { Post } from './features/posts/types';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import store from './store/store';
import { Provider } from 'react-redux';

interface AppProps {
  title: string;
  done?: boolean;
}
 
class App extends React.Component<AppProps, unknown> {
  
  static defaultProps: Partial<AppProps> = { 
    done: false,
  }

  constructor(props: AppProps) {
    super(props);
  }

  componentDidMount() {
    const postsReq = this.getPosts();
    postsReq.then((posts: Post[]) => {
      console.log('posts', posts);
    });
  }

  async getPosts() {
    const response = await client.get('/fakeApi/posts');
    return response.posts;
  }

  render(): JSX.Element {

    return (
      <React.Fragment>
        <Provider store={store}>
          <Router>
            <NavBar/>
            <Switch>
              <Route exact path="/" render={() => <HomePage/>}/>
              <Route exact path="/posts/:postId" component={SinglePostPage} />
              <Route exact path="/editPost/:postId" 
                  component={EditPostForm} />
              <Redirect to="/" />
            </Switch>
            <div className={style.footer}>
              <div className={style.container}>
                <p>The Javascript/ Typescript laboratories. 
                  Contact: Programming Laboratory.</p>
              </div>
            </div>

          </Router>
        </Provider>
      </React.Fragment>
      );
  }
}

export default hot(App);