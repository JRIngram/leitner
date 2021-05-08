import React, { useState, useEffect } from 'react';
import { getAllCards } from '../../utils/axios';
import ManageQuizzesCardListItem from '../ManageQuizzesCardListItem/ManageQuizzesCardListItem';
import Divider from '../Divider/Divider';

type cardType = {
  _id: string,
  prompt: string,
  answer: string,
}

type ManageQuizzesCardListProps = {
  handleCheckChange: Function
  selectedCardIds: string[]
  testId: string
}

const ManageQuizzesCardList = (props: ManageQuizzesCardListProps) => {
  const [cards, setCards] = useState<cardType[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);


  useEffect(() => {
    let didCancel = false;
    const loadData = async () => {
      const response = await getAllCards();
      const allCards = response.data;
      if(!didCancel){
        setIsLoadingData(true);
      }
      if(!didCancel){
        setCards(allCards);
      }
      if(!didCancel){
        setIsLoadingData(false);
      }
    }

    loadData();

    return () => {didCancel = true}
  }, []);

  const isCardSelected = (cardId: string) => {
    const { selectedCardIds } = props;
    return selectedCardIds.includes(cardId);
  }

  const loadList = () => {
    if(cards.length > 0 && !isLoadingData){
      return cards.map((card: cardType, index:number) => {
        return ( 
          <div key={card._id} >
            <ManageQuizzesCardListItem 
              id={card._id} 
              prompt={card.prompt}
              answer={card.answer}
              handleCheckChange={props.handleCheckChange}
              checked={isCardSelected(card._id)}
            />
            <Divider />
          </div>
        );
      });
    }
    else if(!isLoadingData){
      return <p>No cards have been created.</p>
    }
    else{
      return <p>Loading cards...</p>
    }
  }

  return (
    <div data-testid={props.testId}>
      {loadList()}
    </div>
  )
}

export default ManageQuizzesCardList;