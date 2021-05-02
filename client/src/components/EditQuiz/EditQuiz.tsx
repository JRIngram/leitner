import React, { useState } from 'react';
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

type EditQuizProps = {
  quizName: string,
  quizDescription: string,
  quizId: string,
  cardsInQuiz: string[],
  onCancel: Function,
}

const EditQuiz = (props: EditQuizProps) => {
  const [quizName, setQuizName] = useState(props.quizName);
  const [quizDescription, setQuizDescription] = useState(props.quizDescription);
  const [checkedCards, setCheckedCards] = useState<string[]>(props.cardsInQuiz);

  const handleCheckChange = (itemChecked: boolean, changedCardId: string) => {
    if(itemChecked){
      setCheckedCards([...checkedCards, changedCardId]);
    }
    else{
      setCheckedCards(checkedCards.filter(cardIds => cardIds !== changedCardId));
    }
  }

  const displayAddQuizButton = () => {
    const loadAddButton = () => {
      if(checkedCards.length > 0){
        return (
          <ColouredButton
            buttonType={ButtonType.add}
            text="confirm edit quiz"
            onClickAction={async () => { 
              console.log("I WILL EDIT A QUIZ")
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
        {loadAddButton()}
        <ColouredButton
          buttonType={ButtonType.default}
          text="cancel"
          onClickAction={props.onCancel}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Editing quiz {props.quizId}</h2>
      <form>
        <div>
          <label style={styles.labelStyle} htmlFor="quizName">Quiz Name</label>
          <input 
            style={styles.inputStyle}
            type="text"
            id="quizName"
            value={quizName}
            onChange={event => { setQuizName(event.target.value) }}
          />
        </div>
        <div>
          <label style={styles.labelStyle} htmlFor="quizDescription">Description</label>
          <input 
            style={styles.inputStyle}
            type="text"
            id="quizDescription"
            value={quizDescription}
            onChange={event => { setQuizDescription(event.target.value) }}
          />
        </div>
      </form>
      {displayAddQuizButton()}
      <ManageQuizzesCardList handleCheckChange={handleCheckChange} selectedCardIds={props.cardsInQuiz}/>
    </div>
  );
}

export default EditQuiz;