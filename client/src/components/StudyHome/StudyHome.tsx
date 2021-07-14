import React, { useState, useEffect } from 'react';
import { Quiz } from '../../../../types';
import { ColouredButton, ButtonType } from '../../components/ColouredButton/ColouredButton';
import ViewQuizzesListItem from '../../components/ViewQuizzesListItem/ViewQuizzesListItem';
import Divider from '../../components/Divider/Divider';
import { getAllQuizzes } from '../../utils/axios';

type StudyHomeProps = { 
  onQuizSelect: Function
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
            <div key={quiz._id}>
              <ColouredButton buttonType={ButtonType.nav} text="start quiz" onClickAction={() => { return props.onQuizSelect(quiz)}} />
              <ViewQuizzesListItem id={quiz._id} name={quiz.name} description={quiz.description} cardObjects={[]} />
              <Divider />
            </div>

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