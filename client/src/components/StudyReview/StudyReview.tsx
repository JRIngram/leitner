import React from 'react';
import StudyReviewListItem from '../StudyReviewListItem/StudyReviewListItem';
import {ButtonType, ColouredButton} from '../ColouredButton/ColouredButton'
import Divider from '../Divider/Divider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

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

const styles = {
  iconContainer: {
    marginRight: '3%',
    marginLeft: '1%'
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    margin: 'auto',
    alignItems: 'center'
  },
  textContainer: {
  }
}

const loadCorrectIcon = (correct: boolean) => {
  console.log(correct)
  return correct ? 
    <FontAwesomeIcon icon={faCheckCircle} color="green" size="3x"/> : 
    <FontAwesomeIcon icon={faTimesCircle} color="red" size="3x"/>
}

const loadReviewList = (cardList: formattedCard[]) => {
  return cardList.map((card) => {
    return (
      <div>
        <div style={styles.reviewContainer}>
          <div style={styles.iconContainer}>{loadCorrectIcon(card.correct)}</div>
          <div style={styles.textContainer}>
            <StudyReviewListItem reviewItem={card}/>
          </div>
        </div>
        <Divider />
      </div>
    )
  });
}

const calculateCorrectAnswers = (cardList: formattedCard[]) => { 
  return cardList.filter((card) => card.correct).length; 
}

const calculateCorrectPercentage = (cardList: formattedCard[]) => {
  return calculateCorrectAnswers(cardList) / cardList.length;
}

const StudyReview = ({cardList, onFinishReview}: StudyReviewProps) => {
  return (
    <div>
      <h2>Quiz Review</h2>
      <h3>{calculateCorrectAnswers(cardList)} correct out of {cardList.length} - {calculateCorrectPercentage(cardList)}%</h3>
      {loadReviewList(cardList)}
      <ColouredButton 
        text="Finish Review"
        buttonType={ButtonType.nav}
        onClickAction={onFinishReview}
      />
    </div>
  );
};

export default StudyReview;