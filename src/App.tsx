import { hot } from 'react-hot-loader/root';
import React from 'react';

const App = ({title}: {title: string}) => <div>Hello World {title}</div>;

export default hot(App);