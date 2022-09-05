import React, { useState, useEffect } from 'react';
import { Card } from '../../../types';
import { getAllCards } from '../../utils/axios';
import Divider from '../Divider/Divider';

type ManageQuizzesCardListProps = {
  handleCheckChange: (isItemChecked: boolean, changedCardId: string) => void
  selectedCardIds: string[]
  testId: string
}

export const ManageQuizzesCardList = (props: ManageQuizzesCardListProps) => {
  const [cards, setCards] = useState<Card[]>([]);
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
      return cards.map((card: Card, index:number) => {
        return ( 
          <div key={card._id} >
            <ManageQuizzesCardListItem 
              id={card._id}
              index={index}
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

type  ManageQuizzesCardListItemProps = {
  id: string,
  index: number,
  prompt: string,
  answer: string,
  handleCheckChange: (isItemChecked: boolean, changedCardId: string) => void,
  checked: boolean
}

const manageQuizzesCardListItemStyles = {
  checkboxContainer: {
    display: 'inline-block'
  },
  paragraphContainer: {
    display: 'inline-block',
    marginLeft: '20px'
  }
}

const ManageQuizzesCardListItem = (props: ManageQuizzesCardListItemProps) => {
  const [isChecked, setIsChecked] = useState(props.checked);
  const testId = `manage-quiz-card-list-item-${props.id}`

  return (
    <div data-testid={testId}>
      <div style={manageQuizzesCardListItemStyles.checkboxContainer}>
        <label 
          htmlFor={`add card ${props.id}`}
          data-testid={`${testId}-checkbox-label`}
        >
          Add Card
        </label>
        <input 
          data-testid={`${testId}-checkbox-${isChecked}`}
          type="checkbox"
          id={`add-card-checkbox-${props.index}`}
          checked={isChecked}
          onChange={
            (e) => {
              setIsChecked(e.target.checked)
              props.handleCheckChange(e.target.checked, props.id)
            }
          }/>
      </div>
      <div style={manageQuizzesCardListItemStyles.paragraphContainer}>
        <p data-testid={`${testId}-prompt`}>Prompt: {props.prompt}</p>
        <p data-testid={`${testId}-answer`}>Answer: {props.answer}</p>
      </div>
    </div>
  );
}