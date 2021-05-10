import React, { useState } from 'react';
import { addQuiz } from '../../utils/axios';
import { ColouredButton, ButtonType } from '../ColouredButton/ColouredButton';
import ManageQuizzesCardList from '../ManageQuizzesCardList/ManageQuizzesCardList';

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

const AddQuiz = () => {
  const [quizName, setQuizName] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [checkedCards, setCheckedCards] = useState<string[]>([]);
  const [addResponseStatus, setAddResponseStatus] = useState(0);

  const handleCheckChange = (itemChecked: boolean, changedCardId: string) => {
    if(itemChecked){
      setCheckedCards([...checkedCards, changedCardId]);
    }
    else{
      setCheckedCards(checkedCards.filter(cardIds => cardIds !== changedCardId));
    }
  }

  const displayAddQuizButton = () => {
    if(checkedCards.length > 0){
      return (
        <ColouredButton
          buttonType={ButtonType.add}
          text="confirm add quiz"
          onClickAction={async () => {
            setAddResponseStatus(0);
            const response = await addQuiz(quizName, quizDescription, checkedCards);
            setAddResponseStatus(response.status);
          }} 
        />
      )
    }
    else{
      return <p>A quiz must contain at least one card.</p>;
    }
  }

  const displayResponseInfo = () => {
    if(addResponseStatus === 200){
      return <p>Quiz successfully added.</p>
    }
    else if(addResponseStatus !== 0){
      return <p>Error adding quiz.</p>
    }
  }

  return (
    <div data-testid='add-quiz'>
      <h2>Add a Quiz</h2>
      <form>
        <div>
          <label 
            style={styles.labelStyle} 
            htmlFor="quizName"
            data-testid="add-quiz-name-label"
          >
            Quiz Name
          </label>
          <input 
            style={styles.inputStyle}
            type="text"
            id="quizName"
            onChange={event => { setQuizName(event.target.value) }}
            data-testid="add-quiz-name-input"
          />
        </div>
        <div>
          <label 
            style={styles.labelStyle}
            htmlFor="quizDescription"
            data-testid="add-quiz-description-label"
          >
            Description
          </label>
          <input 
            style={styles.inputStyle}
            type="text"
            id="quizDescription"
            onChange={event => { setQuizDescription(event.target.value) }}
            data-testid="add-quiz-description-input"
          />
        </div>
      </form>
      {displayResponseInfo()}
      {displayAddQuizButton()}
      <ManageQuizzesCardList 
        handleCheckChange={handleCheckChange}
        selectedCardIds={checkedCards}
        testId={`manage-quizzes-card-list-add-quiz`}
      />
    </div>
  );
}

export default AddQuiz;