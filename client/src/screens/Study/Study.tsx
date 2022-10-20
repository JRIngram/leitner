import React, { ReactElement, useState } from 'react';
import { Card, Quiz, FormattedCard, QuizUnderstudy } from '../../../types';
import StudyHome from '../../components/StudyHome/StudyHome';
import StudyQuestion from '../../components/StudyQuestion/StudyQuestion';
import StudyReview from '../../components/StudyReview/StudyReview';
import { getCardsByIds } from '../../utils/axios';

const Study = (): ReactElement => {
  const [quiz, setQuiz] = useState<QuizUnderstudy>({
    _id: '',
    name: '',
    description: '',
    cardObjects: [],
    cards: [],
    quizBoxLevel: 1
  })
  const [cardCount, setCardCount] = useState(0);

  const constructQuiz = async (quiz: Quiz, boxLevel: number) => {
    const cardsEqualToBoxLevel = quiz.cardObjects.filter(cardObject => cardObject.box.toString() === boxLevel.toString());
    const cardIds = cardsEqualToBoxLevel.map(card => card._id);
    const cards = await getCardsByIds(cardIds).then(response => {
      const formattedCards: FormattedCard[] = response.data.map((card: Card) => {
        return {
          ...card,
          givenAnswer: '',
          correct: false,
        }
      });
      
      return formattedCards;
    });

    const quizUnderStudy: QuizUnderstudy = {
      ...quiz,
      cardObjects: cardsEqualToBoxLevel,
      cards,
      quizBoxLevel: boxLevel,
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
              const currentCard = quizCardsClone[cardCount];

              const updatedCard = {
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
            quizId={quiz._id}
            cardList={quiz.cards}
            onFinishReview={() => {
              setQuiz({
                _id: '',
                name: '',
                description: '',
                cardObjects: [],
                cards: [],
                quizBoxLevel: 1
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
            (quiz: Quiz, boxLevel: number) => {
              constructQuiz(quiz, boxLevel).then(constructedQuiz => {
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