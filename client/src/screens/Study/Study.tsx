import React, { useState, useEffect } from 'react';
import { ColouredButton, ButtonType } from '../../components/ColouredButton/ColouredButton';
import ViewQuizzesListItem from '../../components/ViewQuizzesListItem/ViewQuizzesListItem';
import Divider from '../../components/Divider/Divider';
import { getAllQuizzes } from '../../utils/axios';

type quizType = { 
  _id: string,
  name: string,
  description: string,
  cardObjectIds: string[]
}


const Study = () => {
  const [quizzes, setQuizzes] = useState<quizType[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    let didCancel = false;
    const loadData = () => getAllQuizzes().then(response => {
      try{
        if(!didCancel){
          setIsLoadingData(true);
          setQuizzes(response.data);
          setIsLoadingData(false);
        }
      }
      catch(err){
        throw new Error(err);
      }
    });

    loadData();
    return () => {didCancel = true}
  });

  const renderQuizList = () => {
    if(quizzes.length > 0 && !isLoadingData){
      const renderedQuizItems = () => {
        return quizzes.map(quiz => {
          return (
            <div>
              <ColouredButton buttonType={ButtonType.nav} text="start quiz" onClickAction={() => {}} />
              <ViewQuizzesListItem id={quiz._id} name={quiz.name} description={quiz.description} cardIds={[]} />
              <Divider />
            </div>

          )
        })
      }
      return (
        <div>
          {renderedQuizItems()}
        </div>
      )
    }
    else if(isLoadingData){
      return <p>Loading quizzes...</p>
    }
    else{
      return <p>No quizzes have been created. Please create quizzes in the Manage tab.</p>
    }
  }

  return (
    <div>
      <h1>Study</h1>
      <p>Study using your created flashcards and quizzes.</p>
      <div>
        <h2>Quizzes</h2>
        {renderQuizList()}
      </div>
    </div>

  )
}

export default Study;