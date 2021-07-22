import React from 'react';
import { CardIdsAndCorrectness, FormattedCard } from '../../../../types';
import StudyReviewListItem from '../StudyReviewListItem/StudyReviewListItem';
import {ButtonType, ColouredButton} from '../ColouredButton/ColouredButton'
import Divider from '../Divider/Divider';
import { updateQuizBoxes } from '../../utils/axios';

type StudyReviewProps = {
  quizId: string
  cardList: FormattedCard[]
  onFinishReview: Function
}

const loadReviewList = (cardList: FormattedCard[]) => {
  return cardList.map((card) => {
    return (
      <div>
        <StudyReviewListItem reviewItem={card}/>
        <Divider />
      </div>
    )
  });
}

const updateQuizCardBoxes = async (quizId: string, cardList: FormattedCard[]) => {
  const cardIdsAndCorrectness: CardIdsAndCorrectness[] = cardList.map(card => {
    return {
      _id: card._id,
      correct: card.correct,
    }
  });
  try{ 
    await updateQuizBoxes(quizId, cardIdsAndCorrectness);
    return true;
  } catch (err) {
    return false;
  }
}

const calculateCorrectAnswers = (cardList: FormattedCard[]) => { 
  return cardList.filter((card) => card.correct).length; 
}

const calculateCorrectPercentage = (cardList: FormattedCard[]) => {
  return ((calculateCorrectAnswers(cardList) / cardList.length) * 100).toFixed(2);
}

const StudyReview = ({quizId, cardList, onFinishReview}: StudyReviewProps) => {
  return (
    <div>
      <h2>Quiz Review</h2>
      <h3>{calculateCorrectAnswers(cardList)} correct out of {cardList.length} - {calculateCorrectPercentage(cardList)}%</h3>
      {loadReviewList(cardList)}
      <ColouredButton 
        text="finish review"
        buttonType={ButtonType.nav}
        onClickAction={() => {
          updateQuizCardBoxes(quizId, cardList);
          onFinishReview();
        }}
      />
    </div>
  );
};

export default StudyReview;