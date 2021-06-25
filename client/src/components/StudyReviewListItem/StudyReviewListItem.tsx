import React from 'react';

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

const StudyReviewListItem = ({reviewItem}: StudyReviewListItemProps) => {
  return (
    <div>
      <p>Prompt: {reviewItem.prompt}</p>
      <p>Your Answer: {reviewItem.givenAnswer}</p>
      <p>Actual Answer: {reviewItem.answer}</p>
    </div>
  )
}

export default StudyReviewListItem;