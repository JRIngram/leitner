import React, { useState, useEffect } from 'react';
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

const ManageQuizzes = () => {
  const [quizName, setQuizName] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [checkedCards, setCheckedCards] = useState<string[]>([]);

  const handleCheckChange = (itemChecked: boolean, changedCardId: string) => {
    if(itemChecked){
      setCheckedCards([...checkedCards, changedCardId]);
    }
    else{
      setCheckedCards(checkedCards.filter(cardIds => cardIds !== changedCardId));
    }
  }

  return (
    <div>
      <ColouredButton
        buttonType={ButtonType.navFilled}
        text="add quiz"
        onClickAction={() => true}
      />
      <h2>Add a Quiz</h2>
      <form>
        <div>
          <label style={styles.labelStyle} htmlFor="quizName">Quiz Name</label>
          <input 
            style={styles.inputStyle}
            type="text"
            id="quizName"
            onChange={event => { setQuizName(event.target.value) }}
          />
        </div>
        <div>
          <label style={styles.labelStyle} htmlFor="quizDescription">Description</label>
          <input 
            style={styles.inputStyle}
            type="text"
            id="quizDescription"
            onChange={event => { setQuizDescription(event.target.value) }}
          />
        </div>
      </form>
      <ColouredButton
        buttonType={ButtonType.add}
        text="confirm add quiz"
        onClickAction={async () => { 
          await addQuiz(quizName, quizDescription, checkedCards);
        }} 
      />
      <ManageQuizzesCardList handleCheckChange={handleCheckChange}/>
    </div>
  );
}

export default ManageQuizzes;