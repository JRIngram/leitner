import React, { useState } from 'react';
import { ColouredButton, ButtonType } from '../ColouredButton/ColouredButton'

type quizType = { 
  _id: string,
  name: string,
  description: string,
  cardObjectIds: string[]
}

type StudyQuestionProps = {
  prompt: string,
  answer: string,
  currentQuestionNumber: number,
  totalQuestionCount: number,
  onAnswerGiven: Function,
  onQuestionFinished: Function,
}

const StudyQuestion = ({prompt, answer, currentQuestionNumber, totalQuestionCount}: StudyQuestionProps) => {
  const [isReviewing, setIsReviewing] = useState(false);
  const [givenAnswer, setGivenAnswer] = useState('');

  const renderQuestion = () => {
    if(!isReviewing){
      return (
        <div>
          <input 
            type="text"
            value={givenAnswer}
            onChange={event => {setGivenAnswer(event.target.value)}}
          />
          <div>
            <ColouredButton 
              buttonType={ButtonType.default}
              text={'submit answer'}
              onClickAction={() => {setIsReviewing(true)}}
            />
          </div>
        </div>
      );
    }
    else{
      return (
        <div>
          <p>You said: {givenAnswer}</p>
          <p>The actual answer is: {answer}</p>
          <p>Did you get the answer correct?</p>
          <ColouredButton 
              buttonType={ButtonType.add}
              text={'correct'}
              onClickAction={() => {}}
            />
                        <ColouredButton 
              buttonType={ButtonType.delete}
              text={'incorrect'}
              onClickAction={() => {}}
            />
        </div>
      );
    }
  }

  return (
    <div>
      <h1>{prompt}</h1>
      <h2>Question {currentQuestionNumber + 1} of {totalQuestionCount}</h2>
      <p>{prompt}</p>
      {renderQuestion()}
    </div>

  )
}

export default StudyQuestion;