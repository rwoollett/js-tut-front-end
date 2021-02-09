import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import TodoItem from './Todo';
//const api_url = process.env.API_URL || '';

interface AppProps {
  title: string;
  done?: boolean;
}

interface AppState {
  hello: string;
  world: string;
}

class App extends React.Component<AppProps, AppState> {
  
  static defaultProps: Partial<AppProps> = {
    done: false,
  }

  constructor(props: AppProps) {
    super(props);
    this.state = {
      hello: '',
      world: ''
    };
  }

  componentDidMount(){
    
    fetch('/api/v1/hello')
      .then(function(response) {
        return response.text();
        })
      .then( (text) => {
        this.setState({
          hello: text
        });
      });
    
    fetch('/api/v1/world')
      .then(function(response) {
        return response.text();
        }).then( (text) => {
          this.setState({
            world: text
          });
      });
  }

  render() {
    const {title, done} = this.props;
    const {hello, world} = this.state;
    return (<div>
             <div>{hello} the {world} - {title} {done}</div>
              <TodoItem text="update 2"/>
              <ReactFCComponent text="my component">
                <p>one</p>
                <p>two</p>
              </ReactFCComponent> 
            </div>);
  }
}

const ReactFCComponent: React.FC<{text:string}> = ({children, text}) => {
  const [value, setValue] = useState('');

  return (<div>
      <h1>{text}</h1>
      {children}
      <label htmlFor="in1"/>
      <input id="in1" onChange={(e) => setValue(e.target.value)}></input>
      <hr/>
      {value}
    </div>);
};

export default hot(App);