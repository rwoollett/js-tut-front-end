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
  author?: JSX.Element|undefined;
  timeAgo?: JSX.Element|undefined;
  reactEmoji?: JSX.Element|undefined;
}

const Card = (
  {title, catchPhrase, link, author, timeAgo, reactEmoji}: CardProps
  ): JSX.Element => {
  return (
    <div className={style.card}>
      <div>
        <h3>{title}</h3>
        { author ? author : '' }
        { timeAgo ? timeAgo : '' }
        <p>{catchPhrase}</p>
        { reactEmoji ? reactEmoji : "" }
        { link ? <Link to={link.to}>
            {link.text}
          </Link> : "" }
      </div>
   </div>);
};

export default Card;
export { CardProps };