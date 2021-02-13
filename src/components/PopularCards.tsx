import React from 'react';
import styles from '../scss/labshome.scss';
import { Card, CardProps} from './Card';

const PopularCards: React.FC<{cards: CardProps[]}> = (
     {cards}): JSX.Element => {

  return (<div className={styles.popular}>
    <h2>Popular Laboratories</h2>
    <p>Select a laboratory and explore the algorithm 
      with the program and input data.</p>
    <div className={styles['popular-labs']}>
      {
        cards.map( (card: CardProps, i:number):JSX.Element => 
          (
            <Card key={i} title={card.title} catchPhrase={card.catchPhrase}/>
          )
        ) 
      }
    </div>
  </div>);
};

export { PopularCards };