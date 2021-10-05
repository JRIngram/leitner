import React, { useState, useEffect, ReactElement } from 'react';
import { Card } from '../../../../types';
import { ColouredButton, ButtonType } from '../ColouredButton/ColouredButton';
import { CardForm, CardFormType } from '../CardForm/CardForm';
import { getAllCards } from '../../utils/axios';
import CardListItem from '../ManageCardsListItem/ManageCardsListItem';
import Divider from '../Divider/Divider';

const ManageCards = (): ReactElement => {
  const [addCardVisisble, setAddCardVisisble] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    let didCancel = false;

    const loadData = async () => {
      if(isLoadingData && !didCancel){
        const returnedCards = (await getAllCards()).data;
        if(!didCancel){
          setCards(returnedCards);
        }
        if(!didCancel){
          setIsLoadingData(false);
        }
      }
    }

    loadData();

    return () => { didCancel = true };
  }, [isLoadingData, cards]);

  const showAddCardSection = () => {
    if(addCardVisisble){
      return (
        <div>
          <h2>Add a card</h2>
          <CardForm
            afterGreenButtonClick={() => {
              setAddCardVisisble(false);
              setIsLoadingData(true);
            }}
            onCancel={() => setAddCardVisisble(false)}
            formType={CardFormType.add}
          />
          <Divider />
        </div>
      )
    }
  }

  const loadList = () => {
    if(cards.length > 0 && !isLoadingData){
      return cards.map((card: Card) => {
        return ( 
          <div key={card._id}>
            <CardListItem 
              id={card._id} 
              prompt={card.prompt}
              answer={card.answer}
              onEdit={() => { setIsLoadingData(true) }}
              onDelete={() => {  setIsLoadingData(true) }}
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
    <div data-testid='manage-cards'>
      <ColouredButton onClickAction={() => setAddCardVisisble(true)} text='add cards' buttonType={ButtonType.add} />
      {showAddCardSection()}
      <Divider />
      <div>
        {loadList()}
      </div>
    </div>
  );
}

export default ManageCards;