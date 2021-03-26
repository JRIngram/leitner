import React, { useState } from 'react';
import { ColouredButton, ButtonType } from '../ColouredButton/ColouredButton';
import { CardForm, CardFormType } from '../CardForm/CardForm';
import { deleteCard } from '../../utils/axios';

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
    <details data-testid={id}>
      <summary>
        {prompt.substring(0, 20)} / {answer.substring(0, 20)}
        <span>
          <ColouredButton onClickAction={() => { setEditMode(true) }} text="edit" buttonType={ButtonType.default} />
          <ColouredButton 
            onClickAction={async () => { 
              await deleteCard(id);
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