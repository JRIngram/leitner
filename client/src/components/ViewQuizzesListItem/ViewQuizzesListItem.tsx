import React, { useState, useEffect } from 'react';
import { Card } from './../../../../types';
import { getCardsByIds } from '../../utils/axios';

type viewQuizzesListItemProps = {
  id: string
  name: string
  description: string
  cardIds: string[]
}

const ViewQuizzesListItem = (props: viewQuizzesListItemProps) => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    let didCancel = false;

    const loadData = async () => {
      const returnedCards = await getCardsByIds(props.cardIds);
      if(!didCancel){
        setCards(returnedCards.data);
      }
    }

    loadData();

    return () => { didCancel = true }
  }, [props.cardIds]);

  const loadCards = () => {
    const renderCards =() => {
      if(cards.length > 0){
        return cards.map((card: Card) => {
          return (
            <li key={card._id}>{card.prompt}</li>
          )
        })
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