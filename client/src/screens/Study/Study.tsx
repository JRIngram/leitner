import React, { useState } from 'react';
import { Quiz, FormattedCard, CardInQuiz } from '../../../../types';
import StudyHome from '../../components/StudyHome/StudyHome';
import StudyQuestion from '../../components/StudyQuestion/StudyQuestion';
import StudyReview from '../../components/StudyReview/StudyReview';
import { getCardsByIds } from '../../utils/axios';

type quizUnderstudy = {
  _id: string,
  name: string,
  description: string,
  cardObjects: CardInQuiz[]
  cards: FormattedCard[]
}

const Study = () => {
  const [quiz, setQuiz] = useState<quizUnderstudy>({
    _id: '',
    name: '',
    description: '',
    cardObjects: [],
    cards: []
  })
  const [cardCount, setCardCount] = useState(0);

  const constructQuiz = async (quiz: Quiz) => {
    const cardIds = quiz.cardObjects.map(card => card._id);
    const cards = await getCardsByIds(cardIds).then(response => {
      const formattedCards: FormattedCard[] = response.data.map(card => {
        return {
          ...card,
          givenAnswer: '',
          correct: false,
        }
      });
      
      return formattedCards;
    });

    let quizUnderStudy: quizUnderstudy = {
      ...quiz,
      cards
    }
    console.log(quizUnderStudy)
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
                cardObjects: [],
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