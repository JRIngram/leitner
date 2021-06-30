import React, { useState } from 'react';
import { Quiz, FormattedCard } from '../../../../types';
import StudyHome from '../../components/StudyHome/StudyHome';
import StudyQuestion from '../../components/StudyQuestion/StudyQuestion';
import StudyReview from '../../components/StudyReview/StudyReview';
import { getCardsByIds } from '../../utils/axios';

type quizUnderstudy = {
  _id: string,
  name: string,
  description: string,
  cardObjectIds: string[]
  cards: FormattedCard[]
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

  const constructQuiz = async (quiz: Quiz) => {
    const cards = await getCardsByIds(quiz.cardObjectIds).then(response => {
      const formattedCards = response.data.map(card => {
        return {
          ...card,
          givenAnswer: '',
          correct: false,
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
    if(quiz._id !== '' && cardCount < quiz.cards.length){
      return (
        <div>
          <h1>{quiz.name}</h1>
          <StudyQuestion
            prompt={quiz.cards[cardCount].prompt}
            answer={quiz.cards[cardCount].answer}
            currentQuestionNumber={cardCount}
            totalQuestionCount={quiz.cards.length}
            onQuestionFinished={(givenAnswer: string, correct: boolean) => {
              const quizCardsClone = [...quiz.cards];
              let currentCard = quizCardsClone[cardCount];

              let updatedCard = {
                ...currentCard,
                givenAnswer,
                correct,
              }

              quizCardsClone[cardCount] = updatedCard;

              setQuiz({
                ...quiz,
                cards: quizCardsClone,
              });
              setCardCount(cardCount + 1);
            }}
          />
        </div>
        
      )
    }
    else if(quiz._id !== '' && cardCount === quiz.cards.length){
      return (
        <div>
          <h1>{quiz.name}</h1>
          <StudyReview 
            cardList={quiz.cards}
            onFinishReview={() => {
              setQuiz({
                _id: '',
                name: '',
                description: '',
                cardObjectIds: [],
                cards: []
              });
              setCardCount(0);
            }}
          />
        </div>
      );
    }
    else{
      return (
        <StudyHome 
          onQuizSelect={
            (quiz: Quiz) => {
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