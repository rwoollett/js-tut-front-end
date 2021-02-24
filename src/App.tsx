import { hot } from 'react-hot-loader/root';
import React from 'react';
import HomePage from './components/HomePage';
import SinglePostPage  from './components/SinglePostPage';
import EditPostForm  from './components/EditPostForm';
import UsersList from './components/UsersList';
import UserPage from './components/UserPage';
import NotificationsList from  './components/NotificationsList';

import NavBar from './components/NavBar';
import style from './scss/labshome.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';


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

  render(): JSX.Element {

    return (
      <React.Fragment>
        <Router>
          <NavBar/>
          <Switch>
            <Route exact path="/" render={() => <HomePage/>}/>
            <Route exact path="/posts/:postId" component={SinglePostPage} />
            <Route exact path="/editPost/:postId" 
                component={EditPostForm} />
            <Route exact path="/users" component={UsersList} />
            <Route exact path="/users/:userId" component={UserPage} />
            <Route exact path="/notifications" component={NotificationsList} />
            <Redirect to="/" />
          </Switch>
          <div className={style.footer}>
            <div className={style.container}>
              <p>The Javascript/ Typescript laboratories. 
                Contact: Programming Laboratory.</p>
            </div>
          </div>
        </Router>
      </React.Fragment>
      );
  }
}

export default hot(App);