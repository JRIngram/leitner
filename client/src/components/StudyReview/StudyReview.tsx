import React from 'react';
import StudyReviewListItem from '../StudyReviewListItem/StudyReviewListItem';
import {ButtonType, ColouredButton} from '../ColouredButton/ColouredButton'
import Divider from '../Divider/Divider';

type formattedCard = {
  _id: string,
  prompt: string,
  answer: string,
  givenAnswer: string,
  correct: boolean
}

type StudyReviewProps = {
  cardList: formattedCard[]
  onFinishReview: Function
}

const loadReviewList = (cardList: formattedCard[]) => {
  return cardList.map((card) => {
    return (
      <div>
        <StudyReviewListItem reviewItem={card}/>
        <Divider />
      </div>
    )
  });
}

const calculateCorrectAnswers = (cardList: formattedCard[]) => { 
  return cardList.filter((card) => card.correct).length; 
}

const calculateCorrectPercentage = (cardList: formattedCard[]) => {
  return ((calculateCorrectAnswers(cardList) / cardList.length) * 100).toFixed(2);
}

const StudyReview = ({cardList, onFinishReview}: StudyReviewProps) => {
  return (
    <div>
      <h2>Quiz Review</h2>
      <h3>{calculateCorrectAnswers(cardList)} correct out of {cardList.length} - {calculateCorrectPercentage(cardList)}%</h3>
      {loadReviewList(cardList)}
      <ColouredButton 
        text="finish review"
        buttonType={ButtonType.nav}
        onClickAction={onFinishReview}
      />
    </div>
  );
};

export default StudyReview;