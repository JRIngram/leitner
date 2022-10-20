import React, { ReactElement, useState } from 'react';
import { ColouredButton, ButtonType } from '../ColouredButton/ColouredButton';

type StudyQuestionProps = {
  prompt: string,
  answer: string,
  currentQuestionNumber: number,
  totalQuestionCount: number,
  onQuestionFinished: (givenAnswer: string, correct: boolean) => void,
}

const StudyQuestion = ({prompt, answer, currentQuestionNumber, totalQuestionCount, onQuestionFinished}: StudyQuestionProps): ReactElement => {
  const [isReviewing, setIsReviewing] = useState(false);
  const [givenAnswer, setGivenAnswer] = useState('');

  const renderQuestion = () => {
    if(!isReviewing){
      return (
        <div>
          <input
            id='answer-input'
            data-testid='answer-input'
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
              onClickAction={() => { 
                onQuestionFinished(givenAnswer, true);
                setIsReviewing(false);
                setGivenAnswer('');
              }}
            />
            <ColouredButton 
              buttonType={ButtonType.delete}
              text={'incorrect'}
              onClickAction={() => { 
                onQuestionFinished(givenAnswer, false);
                setIsReviewing(false);
                setGivenAnswer('');
              }}
            />
        </div>
      );
    }
  }

  return (
    <div data-testid={'study-question'}>
      <h2>Question {currentQuestionNumber + 1} of {totalQuestionCount}</h2>
      <p id="quizPrompt">{prompt}</p>
      {renderQuestion()}
    </div>

  )
}

export default StudyQuestion;