import React from 'react';
import { FormattedCard } from '../../../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

type StudyReviewListItemProps = {
  reviewItem: FormattedCard
}

const styles = {
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

const loadCorrectIcon = (correct: boolean) => {
  return correct ? 
    <FontAwesomeIcon icon={faCheckCircle} color="green" size="3x" title="icon for correct answer"/> : 
    <FontAwesomeIcon icon={faTimesCircle} color="red" size="3x" title="icon for incorrect answer"/>
}

const StudyReviewListItem = ({reviewItem}: StudyReviewListItemProps) => {
  return (
    <div style={styles.reviewContainer} data-testid="study-review-list-item-container">
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