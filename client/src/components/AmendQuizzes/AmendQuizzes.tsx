import React, { useState, useEffect, useCallback } from 'react';
import { getAllQuizzes } from '../../utils/axios';
import {ColouredButton, ButtonType} from '../ColouredButton/ColouredButton';
import ViewQuizzesListItem from '../ViewQuizzesListItem/ViewQuizzesListItem';
import Divider from '../Divider/Divider';
import { deleteQuiz } from '../../utils/axios';
import EditQuiz from '../EditQuiz/EditQuiz';

type quizType = { 
  _id: string,
  name: string,
  description: string,
  cardObjectIds: string[]
}

const AmendQuizzes = () => {
  const [quizzes, setQuizzes] = useState<quizType[]>([]);
  const [editQuizId, setEditQuizId] = useState('');
  
  const loadData =  useCallback(() => getAllQuizzes().then(response => {
      try{
        setQuizzes(response.data);
      }
      catch(err){
        throw new Error(err);
      }
    }), [])

  useEffect(() => {
    loadData();
  }, [loadData]);

  const renderPage = () => {
    if(editQuizId !== ''){
      const quizUnderEdit = quizzes.filter((quiz) => {
        if(quiz._id === editQuizId){
          return quiz;
        }
      })[0];

      return (
        <EditQuiz 
          quizId={quizUnderEdit._id}
          quizName={quizUnderEdit.name}
          quizDescription={quizUnderEdit.description}
          cardsInQuiz={quizUnderEdit.cardObjectIds}
          onCancel={() => {setEditQuizId('')}}
        />
      );
    }
    else{
      return loadQuizzes();
    }
  }

  const loadQuizzes = () => {
    if(quizzes.length > 0){
      return quizzes.map((quiz: quizType) => {
        return (
          <div>
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
              name={quiz.name}
              description={quiz.description} 
              cardIds={quiz.cardObjectIds}
            />
            <Divider />
          </div>
        )
      });
    }
    return <p>No quizzes have been created...</p>
  }

  // const renderEditQuiz = () => {

  // }

  // ON CLICKING AN EDIT QUIZ BUTTON
  // ALL QUIZZES ON SCREEN SHOULD DISAPPEAR
  // AND THE USER SHOULD SEE THE EDIT QUIZ SCREEN
  // THE ID, NAME, DESCRIPTION AND CARD IDS WILL BE PASSED
  // TO <EDITQUIZ /> WHICH IS V. SIMILAR TO <ADDQUIZ />
  // USER CAN:
  //  ADD QUIZ
  //    WHICH UPDATES MONGODB
  //  CANCEL
  //    WHICH TAKES USERS BACK TO SCREEN BEFORE

  // VIEW QUIZZES NEEDS STATE TO MANAGE EDIT MODE VS. VIEW MODE

  return (
    <div>
      {renderPage()}
    </div>
  )
}

export default AmendQuizzes;