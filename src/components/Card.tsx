import React from 'react';
import style from '../scss/labshome.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
  
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

const Card: React.FC<CardProps> = (
    {title, catchPhrase, link, author, timeAgo, reactEmoji}
  ): JSX.Element => {
  return (
    <div className={style.card}>
      <div>
        <h3>{title}</h3>
        { author ? author : '' }
        { timeAgo ? timeAgo : '' }
        <p>{catchPhrase}</p>
        { reactEmoji ? reactEmoji : "" }
        <div className={style['button-container']}>
          { link ? <Link to={link.to}>
            {link.text}
          </Link> : "" }
        </div>
      </div>
   </div>);
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  catchPhrase: PropTypes.string.isRequired,
  link: PropTypes.shape( {
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }),
  author: PropTypes.element,
  timeAgo: PropTypes.element,
  reactEmoji: PropTypes.element
};

export default Card;
export { CardProps };