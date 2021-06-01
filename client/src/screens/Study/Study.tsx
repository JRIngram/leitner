import React, { useState } from 'react';
import StudyHome from '../../components/StudyHome/StudyHome';
import StudyQuestion from '../../components/StudyQuestion/StudyQuestion';
import { getCardsByIds } from '../../utils/axios';

type quizType = { 
  _id: string,
  name: string,
  description: string,
  cardObjectIds: string[]
}

type formattedCard = {
  _id: string,
  prompt: string,
  answer: string,
  givenAnswer: string,
}

type quizUnderstudy = {
  _id: string,
  name: string,
  description: string,
  cardObjectIds: string[]
  cards: formattedCard[]
}

const Study = () => {
  const [quiz, setQuiz] = useState<quizUnderstudy>({
    _id: '',
    name: '',
    description: '',
    cardObjectIds: [],
    cards: []
  })
  const [cardCount, setCardCount] = useState(0);

  const constructQuiz = async (quiz: quizType) => {
    const cards = await getCardsByIds(quiz.cardObjectIds).then(response => {
      const formattedCards = response.data.map(card => {
        return {
          ...card,
          givenAnswer: '',
        }
      });
      
      return formattedCards;
    });

    let quizUnderStudy = {
      ...quiz,
      cards
    }
    return quizUnderStudy;
  }

  const renderStudyPage = () => {
    if(quiz._id !== ''){
      return (
        <StudyQuestion
          prompt={quiz.cards[cardCount].prompt}
          answer={quiz.cards[cardCount].answer}
          currentQuestionNumber={cardCount}
          totalQuestionCount={quiz.cards.length}
          onAnswerGiven={() => {}}
          onQuestionFinished={() => {}}
        />
      )
    }
    else{
      return (
        <StudyHome 
          onQuizSelect={
            (quiz: quizType) => {
              constructQuiz(quiz).then(constructedQuiz => {
                setQuiz(constructedQuiz);
              });

            }
          }
        />
      )
    }
  }

  return (
    <div data-testid="study-screen-container">
      {renderStudyPage()}
    </div>

  )
}

export default Study;