import React from 'react';
import { ColouredButton, ButtonType } from '../ColouredButton/ColouredButton';
import axios from 'axios';
axios.defaults.baseURL = `http://localhost:3001/`;

type CardListItemProps = {
  id: string,
  prompt: string,
  answer: string,
  // onEdit: Function,
  onDelete: Function
}

const CardListItem = (props: CardListItemProps) => {
  const id = props.id;
  const prompt = props.prompt;
  const answer = props.answer;
  
  const deleteCard = () => {
    axios.get(`deleteCard?id=${id}`)
  }

  return (
    <details data-testid={id}>
      <summary>
        This is an example prompt... / this is an example answer...
        <span>
          <ColouredButton onClickAction={() => { return true }} text="edit" buttonType={ButtonType.default} />
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
      <p>Prompt: {prompt} </p>
      <p>Answer: {answer}</p>
    </details>
  );
}

export default CardListItem