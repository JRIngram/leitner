import React, { useState, useEffect } from 'react';
import { Quiz } from '../../../../types';
import Divider from '../../components/Divider/Divider';
import StudyHomeListItem from '../../components/StudyHomeListItem/StudyHomeListItem';
import { getAllQuizzes } from '../../utils/axios';

type StudyHomeProps = { 
  onQuizSelect: (arg1: Quiz, arg2: number) => void
}

const StudyHome = (props: StudyHomeProps) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
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
  }, []);
  
  const renderQuizList = () => {
    if(quizzes.length > 0){

      const renderedQuizItems = () => {
        return quizzes.map(quiz => {
          return (
            <StudyHomeListItem 
              key={quiz._id}
              quiz={quiz}
              onQuizSelect={props.onQuizSelect}
            />
          )
        })
      }

      return (
        <div>
          <Divider />
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
    <div data-testid="study-screen-home">
      <h1>Study</h1>
      <p>Study using your created flashcards and quizzes.</p>
      <div>
        <h2>Quizzes</h2>
        {renderQuizList()}
      </div>
    </div> 
  );
}

export default StudyHome;