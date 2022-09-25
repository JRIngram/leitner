import React, { useState, useEffect, ReactElement } from 'react';
import { Card, CardInQuiz } from './../../../types';
import { getCardsByIds } from '../../utils/axios';

type viewQuizzesListItemProps = {
  id: string
  name: string
  description: string
  cardObjects: CardInQuiz[]
}

const styles = {
  orderedListStyle: {
    listStyleType: 'none',
  }
}

const ViewQuizzesListItem = (props: viewQuizzesListItemProps): ReactElement => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    let didCancel = false;
    const loadData = async () => {
      const cardIds = props.cardObjects.map(card => card._id)
      const returnedCards = await getCardsByIds(cardIds);
      if(!didCancel){
        setCards(returnedCards.data);
      }
    }

    loadData();

    return () => { didCancel = true }
  }, [props.cardObjects]);

  const loadCards = () => {
    const renderCards =() => {
      if(cards.length > 0){
        const { cardObjects } = props

        const displayBoxedCardPrompts = (box: number) => {
          const boxIds = cardObjects.filter(cardObject => cardObject.box === box).map(cardObject => cardObject._id);
          const boxCardPrompts = boxIds.map(id => { 
            const matchedCard = cards.filter(card => card._id === id)[0];
            return matchedCard ? 
              <li key={matchedCard._id}>{matchedCard.prompt}</li> :
              null;
          });
          return <ul>{boxCardPrompts}</ul>;
        }

        return (
          <ol style={styles.orderedListStyle}>
            <li>
              Box One:
              {displayBoxedCardPrompts(1)}
            </li>
            <li>
              Box Two:
              {displayBoxedCardPrompts(2)}
            </li>
            <li>
              Box Three:
              {displayBoxedCardPrompts(3)}
            </li>
          </ol>
        )
      }
    }
    if(cards.length > 0){
      return (
        <ul data-testid={`view-quizzes-list-item-${props.id}-card-list`}>
          {renderCards()}
        </ul>
      );
    }
  }

  return (
    <div data-testid={`view-quizzes-list-item-${props.id}`} key={`${props.id}`}>
      <p>Name: {props.name}</p>
      <p>Description: {props.description}</p>
      {loadCards()}
    </div>
  )
}

export default ViewQuizzesListItem;