import React from 'react';
import style from '../scss/labshome.scss';
  
interface CardProps {
  title: string;
  catchPhrase: string;
}

const Card = ({title, catchPhrase}: CardProps): JSX.Element => {
  return (
    <div className={style.card}>
      <div>
        <h3>{title}</h3>
        <p>{catchPhrase}</p>
      </div>
   </div>);
};

export default Card;
export {CardProps};