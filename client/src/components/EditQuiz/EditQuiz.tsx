import React, { useState } from 'react';
import { ColouredButton, ButtonType } from '../ColouredButton/ColouredButton';
import ManageQuizzesCardList from '../ManageQuizzesCardList/ManageQuizzesCardList';
import { updateQuiz } from '../../utils/axios'

const styles = { 
  labelStyle: {
    display: 'block'
  },
  inputStyle: {
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid',
    padding: '10px',
    marginBottom: '10px',
  }
}

type EditQuizProps = {
  quizName: string,
  quizDescription: string,
  quizId: string,
  cardsInQuiz: string[],
  onCancel: () => void,
  afterUpdate: () => void,
}

const EditQuiz = (props: EditQuizProps) => {
  const [quizName, setQuizName] = useState(props.quizName);
  const [quizDescription, setQuizDescription] = useState(props.quizDescription);
  const [checkedCards, setCheckedCards] = useState<string[]>(props.cardsInQuiz);

  const handleCheckChange = (isItemChecked: boolean, changedCardId: string) => {
    if(isItemChecked){
      setCheckedCards([...checkedCards, changedCardId]);
    }
    else{
      setCheckedCards(checkedCards.filter(cardIds => cardIds !== changedCardId));
    }
  }

  const displayConfirmEditQuizButton = () => {
    const loadConfirmEditButton = () => {
      if(checkedCards.length > 0){
        return (
          <ColouredButton
            buttonType={ButtonType.add}
            text="confirm edit quiz"
            onClickAction={async () => { 
              await updateQuiz(props.quizId, quizName, quizDescription, checkedCards);
              props.afterUpdate();
            }} 
          />
        )
      }
      else{
        return <p>A quiz must contain at least one card</p>
      }
    }
    
    return (
      <div>
        {loadConfirmEditButton()}
        <ColouredButton
          buttonType={ButtonType.default}
          text="cancel"
          onClickAction={props.onCancel}
        />
      </div>
    )
  }

  return (
    <div data-testid={`edit-quiz-${props.quizId}`}>
      <h2 data-testid={`edit-quiz-${props.quizId}-header`}>Editing quiz {props.quizId}</h2>
      <form>
        <div>
          <label 
            style={styles.labelStyle} 
            htmlFor="quizName"
            data-testid={`edit-quiz-${props.quizId}-name-label`}
          >
            Quiz Name
          </label>
          <input 
            style={styles.inputStyle}
            type="text"
            id="quizName"
            value={quizName}
            onChange={event => { setQuizName(event.target.value) }}
            data-testid={`edit-quiz-${props.quizId}-name-input`}
          />
        </div>
        <div>
          <label
            style={styles.labelStyle}
            htmlFor="quizDescription"
            data-testid={`edit-quiz-${props.quizId}-description-label`}
          >
            Description
          </label>
          <input 
            style={styles.inputStyle}
            type="text"
            id="quizDescription"
            value={quizDescription}
            onChange={event => { setQuizDescription(event.target.value) }}
            data-testid={`edit-quiz-${props.quizId}-description-input`}
          />
        </div>
      </form>
      {displayConfirmEditQuizButton()}
      <ManageQuizzesCardList
        handleCheckChange={handleCheckChange}
        selectedCardIds={props.cardsInQuiz}
        testId={`manage-quizzes-card-list-${props.quizId}`}
      />
    </div>
  );
}

export default EditQuiz;