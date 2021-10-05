import React, { ReactElement, useState } from 'react';
import { ColouredButton, ButtonType } from '../ColouredButton/ColouredButton';
import { CardForm, CardFormType } from '../CardForm/CardForm';
import { deleteCard } from '../../utils/axios';

type ManageCardsListItemProps = {
  id: string,
  prompt: string,
  answer: string,
  onEdit: () => void,
  onDelete: () => void
}

const ManageCardsListItem = (props: ManageCardsListItemProps): ReactElement => {
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

export default ManageCardsListItem;