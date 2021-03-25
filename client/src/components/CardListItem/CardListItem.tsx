import React, { useState } from 'react';
import { ColouredButton, ButtonType } from '../ColouredButton/ColouredButton';
import { CardForm, CardFormType } from '../CardForm/CardForm';
import axios from 'axios';
axios.defaults.baseURL = `http://localhost:3001/`;

type CardListItemProps = {
  id: string,
  prompt: string,
  answer: string,
  onEdit: Function,
  onDelete: Function
}

const CardListItem = (props: CardListItemProps) => {
  const [editMode, setEditMode] = useState(false);
  const id = props.id;
  const prompt = props.prompt;
  const answer = props.answer;
  
  const deleteCard = () => {
    axios.get(`deleteCard?id=${id}`)
  }

  const renderItemContent = () => {
    if(editMode){
      return (
        <CardForm
          afterGreenButtonClick={() => {
            props.onEdit() 
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
    <details data-testid={id}>
      <summary>
        {prompt} / {answer}
        <span>
          <ColouredButton onClickAction={() => { setEditMode(true) }} text="edit" buttonType={ButtonType.default} />
          <ColouredButton 
            onClickAction={() => { 
              deleteCard();
              props.onDelete();
            }} 
            text="delete" 
            buttonType={ButtonType.delete} 
          />
        </span>
      </summary>
      {renderItemContent()}
    </details>
  );
}

export default CardListItem