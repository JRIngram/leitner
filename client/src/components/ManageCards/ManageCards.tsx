import React, { useState, useEffect, useCallback } from 'react';
import { ColouredButton, ButtonType } from '../ColouredButton/ColouredButton';
import { CardForm, CardFormType } from '../CardForm/CardForm';
import { getAllCards } from '../../utils/axios';
import CardListItem from '../CardListItem/CardListItem';
import ListDivider from '../Divider/Divider';


type cardType = {
  _id: string,
  prompt: string,
  answer: string,
}

const ManageCards = () => {
  const [addCardVisisble, setAddCardVisisble] = useState(false);
  const [cards, setCards] = useState<cardType[]>([]);

  const loadData = useCallback(() => getAllCards().then(response => { 
    console.log("Requesting data");
    try{
      setCards(response.data);
    }
    catch(err){
      throw new Error(err);
    }
  }), []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const showAddCardSection = () => {
    if(addCardVisisble){
      return (
        <div>
          <h2>Add a card</h2>
          <CardForm
            afterGreenButtonClick={() => {
              setAddCardVisisble(false);
              loadData();
            }}
            onCancel={() => setAddCardVisisble(false)}
            formType={CardFormType.add}
          />
        </div>
      )
    }
  }

  const loadList = () => {
    if(cards.length > 0){
      return cards.map((card: cardType, index:number) => {
        return ( 
          <div key={card._id} >
            <CardListItem 
              id={card._id} 
              prompt={card.prompt}
              answer={card.answer}
              onEdit={() => { loadData() }}
              onDelete={() => { loadData() }}
            />
            <ListDivider />
          </div>
        );
      });
    }
    else{
      return <p>Loading cards...</p>
    }
  }


  return (
    <div>
      <ColouredButton onClickAction={() => setAddCardVisisble(true)} text='add cards' buttonType={ButtonType.add} />
      {showAddCardSection()}
      <div>
        {loadList()}
      </div>
    </div>
  );
}

export default ManageCards;