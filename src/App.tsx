import { hot } from 'react-hot-loader/root';
import React, { useState } from 'react';
import HomePage from './components/HomePage';

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
    return (
    <div>
       <HomePage/>
       <ReactFCComponent text="Hi"/>
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