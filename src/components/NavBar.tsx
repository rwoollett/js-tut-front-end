import React from 'react';
import { Link } from 'react-router-dom';
import style from '../scss/labshome.scss';

const NavBar: React.FC = () => {

  return (
    <div className={style["navbar-minimal"]}>
      <img src="images/logo.svg"/>
      <Link to="/">Home</Link>
    </div>);

};

export { NavBar };