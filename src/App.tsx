import { hot } from 'react-hot-loader/root';
import React from 'react';
import HomePage from './components/HomePage';
import SinglePostPage from './components/SinglePostPage';
import EditPostForm from './components/EditPostForm';
import NavBar from './components/NavBar';
import style from './scss/labshome.scss';

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

  render(): JSX.Element {
    return (
      <div>
        <Provider store={store}>
          <Router>
            <NavBar/>
            <div>
              <Switch>
                <Route exact path="/" render={() => <HomePage/>}/>
                <Route exact path="/posts/:postId" component={SinglePostPage} />
                <Route exact path="/editPost/:postId" 
                   component={EditPostForm} />
                <Redirect to="/" />
              </Switch>
            </div>
            <div className={style.footer}>
              <div className={style.container}>
                <p>The Javascript/Typescript laboratories. 
                  Contact: Programming Laboratory.</p>
              </div>
            </div>

          </Router>
        </Provider>
      </div>);
  }
}

export default hot(App);