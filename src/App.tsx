import { hot } from 'react-hot-loader/root';
import React from 'react';

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

  render() {
    const {title, done} = this.props;
    return (<div>
             <div>Hello World {title} {done}</div>
              <TodoItem text="update 2"/>
              <ReactFCComponent text="my component">
                <p>one</p>
                <p>two</p>
              </ReactFCComponent> 
            </div>);
  }
} 

interface TodoItemProps {
  done?: boolean,
  text: string,
}

const TodoItem = ({done = false, text}: TodoItemProps) => {
   return <div>{text} {done}</div>;
};

const ReactFCComponent: React.FC<{text:string}> = ({children, text}) => {
  return <div><h1>{text}</h1>{children}</div>;
};


export default hot(App);