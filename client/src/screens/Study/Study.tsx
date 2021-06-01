import React, { useState } from 'react';
import StudyHome from '../../components/StudyHome/StudyHome';

const Study = () => {
  const [quizBeingStudied, setQuizBeingStudied] = useState('');

  const renderStudyPage = () => {
    if(quizBeingStudied === ''){
      return <StudyHome onQuizSelect={(quizId: string) => {setQuizBeingStudied(quizId)}} />
    }
    else{
      return <p>{quizBeingStudied}</p>
    }
  }

  return (
    <div data-testid="study-screen-container">
      {renderStudyPage()}
    </div>

  )
}

export default Study;