import React from 'react';
import style from '../scss/labshome.scss';
  
interface BannerProps {
  title: string;
  desc: string;
}

const Banner = ({title, desc}: BannerProps): JSX.Element => {
  return (
    <div className={style.banner}> 
    <div className={style.container}>
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
  </div>);
};

export default Banner;