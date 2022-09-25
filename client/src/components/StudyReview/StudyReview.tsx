import React, { ReactElement } from 'react';
import { CardIdsAndCorrectness, FormattedCard } from '../../../types';
import {ButtonType, ColouredButton} from '../ColouredButton/ColouredButton'
import Divider from '../Divider/Divider';
import { updateQuizBoxes } from '../../utils/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

type StudyReviewListItemProps = {
  reviewItem: FormattedCard
}

const studyReviewListItemStyles = {
  iconContainer: {
    marginRight: '3%',
    marginLeft: '1%'
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row' as const,
    margin: 'auto',
    alignItems: 'center'
  },
  textContainer: {
  }
}

const StudyReviewListItem = ({reviewItem}: StudyReviewListItemProps) => {
  return (
    <div style={studyReviewListItemStyles.reviewContainer} data-testid="study-review-list-item-container">
      <div style={studyReviewListItemStyles.iconContainer}>{(correct: boolean) => {
        return correct ? 
          <FontAwesomeIcon icon={faCheckCircle} color="green" size="3x" title="icon for correct answer"/> : 
          <FontAwesomeIcon icon={faTimesCircle} color="red" size="3x" title="icon for incorrect answer"/>
      }}</div>
      <div style={studyReviewListItemStyles.textContainer}>
        <p>Prompt: {reviewItem.prompt}</p>
        <p>Your Answer: {reviewItem.givenAnswer}</p>
        <p>Actual Answer: {reviewItem.answer}</p>
      </div>
    </div>
  )
}

const loadReviewList = (cardList: FormattedCard[]) => {
  return cardList.map((card) => {
    return (
      <div key={card._id}>
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

type StudyReviewProps = {
  quizId: string
  cardList: FormattedCard[]
  onFinishReview: () => void
}

const StudyReview = ({quizId, cardList, onFinishReview}: StudyReviewProps): ReactElement => {
  return (
    <div>
      <h2>Quiz Review</h2>
      <h3>{calculateCorrectAnswers(cardList)} correct out of {cardList.length} - {calculateCorrectPercentage(cardList)}%</h3>
      {loadReviewList(cardList)}
      <ColouredButton 
        text="finish review"
        buttonType={ButtonType.nav}
        onClickAction={async () => {
          await updateQuizCardBoxes(quizId, cardList);
          onFinishReview();
        }}
      />
    </div>
  );
};

export default StudyReview;