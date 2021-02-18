import React from 'react';
import { Link } from 'react-router-dom';
import style from '../scss/labshome.scss';
import * as Logo from '../scss/images/logo.svg';

const NavBar: React.FC = () => {
//./images/logo.svg"
console.log("i,age", Logo);
  return (
    <div className={style["navbar-minimal"]}>
      <img src={ Logo.default }/>
      <Link to="/">Home</Link>
    </div>);

};

export default NavBar ;