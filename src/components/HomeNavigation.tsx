import React from 'react';
import styles from '../scss/labshome.scss';
import Card, {CardProps} from './Card';
import PropTypes from 'prop-types';

const HomeNavigation: React.FC<{cards: CardProps[]}> = (
     {cards}): JSX.Element => {

  return (<div className={styles['home-nav']}>
    {
       cards.map( (card: CardProps, i:number):JSX.Element => 
        (
          <Card key={i} title={card.title} catchPhrase={card.catchPhrase}/>
        )
      ) 
    }
  </div>);
};

HomeNavigation.propTypes = {
  cards: PropTypes.array.isRequired
};

export default HomeNavigation;