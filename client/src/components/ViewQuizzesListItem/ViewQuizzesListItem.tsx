import React, { useState, useEffect, useCallback } from 'react';
import { getCardsByIds } from '../../utils/axios';

type viewQuizzesListItemProps = {
  name: string
  description: string
  cardIds: string[]
}

type cardType = {
  _id: string,
  prompt: string,
  answer: string,
}

const ViewQuizzesListItem = (props: viewQuizzesListItemProps) => {
  const [cards, setCards] = useState<cardType[]>([]);

  const loadData = useCallback(() => getCardsByIds(props.cardIds).then(response => {
    console.log("Grabbing cards by ids");
    try{
      console.log("Requesting data");
      setCards(response.data);
    }
    catch(err){
      throw new Error(err);
    }
  }), []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const loadCards = () => {
    if(cards.length > 0){
      return cards.map((card: cardType) => {
        return (
          <li>{card.prompt}</li>
        )
      })
    }
  }

  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Description: {props.description}</p>
      <ul>
        {loadCards()}
      </ul>
    </div>
  )
}

export default ViewQuizzesListItem;