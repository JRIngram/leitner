import React, { useState, useEffect, useCallback, ReactElement } from 'react';
import { Quiz } from '../../../types';
import { getAllQuizzes } from '../../utils/axios';
import {ColouredButton, ButtonType} from '../ColouredButton/ColouredButton';
import ViewQuizzesListItem from '../ViewQuizzesListItem/ViewQuizzesListItem';
import Divider from '../Divider/Divider';
import { deleteQuiz } from '../../utils/axios';
import EditQuiz from '../EditQuiz/EditQuiz';

const AmendQuizzes = (): ReactElement => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [editQuizId, setEditQuizId] = useState('');
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  const loadData =  useCallback(() => getAllQuizzes().then(response => {
      try{
        setQuizzes(response.data);
      } catch(err) {
        console.error({ err })
      }
    }), []);

  useEffect(() => {
    loadData();
    setIsLoadingData(false);
  }, [loadData, editQuizId]);

  const renderPage = () => {
    if(editQuizId !== ''){
      const quizUnderEdit = quizzes.find(quiz => quiz._id === editQuizId);
      if(quizUnderEdit){
        const cardIds = quizUnderEdit.cardObjects.map(card => card._id)
        return (
          <EditQuiz
            quizId={quizUnderEdit._id}
            quizName={quizUnderEdit.name}
            quizDescription={quizUnderEdit.description}
            cardsInQuiz={cardIds}
            onCancel={() => {setEditQuizId('')}}
            afterUpdate={() => {setEditQuizId('')}}
          />
        );
      }
    }
    return loadQuizzes();
  }

  const loadQuizzes = () => {
    if(quizzes.length > 0 && !isLoadingData){
      return quizzes.map((quiz: Quiz) => {
        const cardIds = quiz.cardObjects;
        return (
          <div data-testid={`ammend-quiz-${quiz._id}`} key={quiz._id}>
            <ColouredButton 
              text="edit quiz" 
              buttonType={ButtonType.default} 
              onClickAction={
                async () => {
                  setEditQuizId(quiz._id);
                }
              }
            />
            <ColouredButton 
              text="delete quiz" 
              buttonType={ButtonType.delete} 
              onClickAction={
                async () => {
                  await deleteQuiz(quiz._id);
                  loadData();
                }
              }
            />
            <ViewQuizzesListItem
              id={quiz._id}
              name={quiz.name}
              description={quiz.description} 
              cardObjects={cardIds}
            />
            <Divider />
          </div>
      )
      });
    }
    else if(!isLoadingData){
      return <p>No quizzes have been created.</p>
    }
    else{
      return <p>Loading quizzes...</p>
    }
  }

  return (
    <div data-testid='amend-quizzes'>
      {renderPage()}
    </div>
  )
}

export default AmendQuizzes;