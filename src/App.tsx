import { hot } from 'react-hot-loader/root';
import React from 'react';
import HomePage from './components/HomePage';
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
    return (<Router>
    <div>
      <Switch>
        <Route exact path="/" render={() => <HomePage/>}/>
        <Redirect to="/" />
       </Switch>
    </div>
    </Router>);
  }
}

export default hot(App);