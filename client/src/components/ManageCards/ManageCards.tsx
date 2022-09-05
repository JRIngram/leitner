import React, { useState, useEffect } from 'react';
import { Card } from '../../../types';
import { ColouredButton, ButtonType } from '../ColouredButton/ColouredButton';
import { CardForm, CardFormType } from '../CardForm/CardForm';
import { getAllCards, deleteCard } from '../../utils/axios';
import Divider from '../Divider/Divider';


const ManageCards = () => {
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
            <ManageCardsListItem 
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

type ManageCardsListItemProps = {
  id: string
  prompt: string
  answer: string
  onEdit: () => void
  onDelete: () => void
}

const ManageCardsListItem = (props: ManageCardsListItemProps) => {
  const [editMode, setEditMode] = useState(false);
  const id = props.id;
  const prompt = props.prompt;
  const answer = props.answer;
  
  const renderItemContent = () => {
    if(editMode){
      return (
        <CardForm
          afterGreenButtonClick={async () => {
            await props.onEdit() 
            setEditMode(false);
          }}
          onCancel={() => setEditMode(false)}
          formType={CardFormType.edit}
          cardId={id}
          cardPrompt={prompt}
          cardAnswer={answer}
        />
      );
    }
    else{
      return(
        <div>
          <p>Prompt: {prompt} </p>
          <p>Answer: {answer}</p>
        </div>
      );
    }
  }

  return (
    <div data-testid={`manage-card-list-item-${props.id}`}>
      <ColouredButton onClickAction={() => { setEditMode(true) }} text="edit" buttonType={ButtonType.default} />
      <ColouredButton 
        onClickAction={async () => { 
          await deleteCard(id);
          props.onDelete();
        }} 
        text="delete" 
        buttonType={ButtonType.delete} 
      />
      {renderItemContent()}
    </div>
  );
}


export default ManageCards;