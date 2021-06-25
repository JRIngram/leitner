import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

type formattedCard = {
  _id: string,
  prompt: string,
  answer: string,
  givenAnswer: string,
  correct: boolean
}

type StudyReviewListItemProps = {
  reviewItem: formattedCard
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

const StudyReviewListItem = ({reviewItem}: StudyReviewListItemProps) => {
  return (
    <div style={styles.reviewContainer}>
      <div style={styles.iconContainer}>{loadCorrectIcon(reviewItem.correct)}</div>
      <div style={styles.textContainer}>
        <p>Prompt: {reviewItem.prompt}</p>
        <p>Your Answer: {reviewItem.givenAnswer}</p>
        <p>Actual Answer: {reviewItem.answer}</p>
      </div>
    </div>
  )
}

export default StudyReviewListItem;