import React from 'react';
import style from '../scss/labshome.scss';
import { Link } from 'react-router-dom';
  
interface CardProps {
  title: string;
  catchPhrase: string;
  link?: {
    to: string;
    text: string;
  }|undefined;
}

const Card = ({title, catchPhrase, link}: CardProps): JSX.Element => {
  return (
    <div className={style.card}>
      <div>
        <h3>{title}</h3>
        <p>{catchPhrase}</p>
        { link ? <Link to={link.to}>
            {link.text}
          </Link> : "" }
      </div>
   </div>);
};

export default Card;
export { CardProps };