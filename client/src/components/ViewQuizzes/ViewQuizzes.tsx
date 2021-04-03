import React, { useState, useEffect, useCallback } from 'react';
import { getAllQuizzes } from '../../utils/axios';
import ViewQuizzesListItem from '../ViewQuizzesListItem/ViewQuizzesListItem'
import Divider from '../Divider/Divider';

type quizType = { 
  _id: string,
  name: string,
  description: string,
  cardObjectIds: string[]
}

const ViewQuizzes = () => {
  const [quizzes, setQuizzes] = useState<quizType[]>([]);
  
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

  const loadQuizzes = () => {
    if(quizzes.length > 0){
      return quizzes.map((quiz: quizType) => {
        return (
          <div>
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

  return (
    <div>
      {loadQuizzes()}
    </div>
  )
}

export default ViewQuizzes;