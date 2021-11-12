import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StudyReview from './StudyReview';

jest.mock('../StudyReviewListItem/StudyReviewListItem');

describe('StudyReview', () =>{
  it('renders quiz review title', () => {
    const { getByText } = render(<StudyReview quizId={''} cardList={[]} onFinishReview={() => true}/>);
    expect(getByText('Quiz Review')).toBeVisible();
  });

  it('calls the finish review quiz callback', async () => {
    const callback = jest.fn();
    const { getByText } = render(<StudyReview quizId={''} cardList={[]} onFinishReview={callback}/>);
    expect(callback).toBeCalledTimes(0);
    fireEvent.click(getByText("finish review"));
    await waitFor(() => { expect(callback).toBeCalledTimes(1)})
  })

  describe('percentage correct heading', () => {
    it('renders 100% correct correctly', () => {
      const cardList = [
        {
          _id: '0',
          prompt: 'p1',
          answer: 'a2',
          givenAnswer: 'g1',
          correct: true
        },
        {
          _id: '1',
          prompt: 'p2',
          answer: 'a2',
          givenAnswer: 'g2',
          correct: true
        },
      ];
      const { getByText, getAllByTestId } = render(<StudyReview quizId={''} cardList={cardList} onFinishReview={() => true}/>);
      expect(getByText('2 correct out of 2 - 100.00%')).toBeVisible();
      expect(getAllByTestId('study-review-list-item-container').length).toBe(2);
      expect(getAllByTestId('study-review-list-item-container')[0]).toBeVisible();
    });

    it('renders 0% correct correctly', () => {
      const cardList = [
        {
          _id: '0',
          prompt: 'p1',
          answer: 'a2',
          givenAnswer: 'g1',
          correct: false
        },
        {
          _id: '1',
          prompt: 'p2',
          answer: 'a2',
          givenAnswer: 'g2',
          correct: false
        },
      ];
      const { getByText, getAllByTestId } = render(<StudyReview quizId={''} cardList={cardList} onFinishReview={() => true}/>);
      expect(getByText('0 correct out of 2 - 0.00%')).toBeVisible();
      expect(getAllByTestId('study-review-list-item-container').length).toBe(2);
      expect(getAllByTestId('study-review-list-item-container')[0]).toBeVisible();
    });

    it('renders 50% correct correctly', () => {
      const cardList = [
        {
          _id: '0',
          prompt: 'p1',
          answer: 'a2',
          givenAnswer: 'g1',
          correct: true
        },
        {
          _id: '1',
          prompt: 'p2',
          answer: 'a2',
          givenAnswer: 'g2',
          correct: false
        },
      ];
      const { getByText, getAllByTestId } = render(<StudyReview quizId={''} cardList={cardList} onFinishReview={() => true}/>);
      expect(getByText('1 correct out of 2 - 50.00%')).toBeVisible();
      expect(getAllByTestId('study-review-list-item-container').length).toBe(2);
      expect(getAllByTestId('study-review-list-item-container')[0]).toBeVisible();
    });

    it('renders 33.33% correct correctly', () => {
      const cardList = [
        {
          _id: '0',
          prompt: 'p1',
          answer: 'a2',
          givenAnswer: 'g1',
          correct: true
        },
        {
          _id: '1',
          prompt: 'p2',
          answer: 'a2',
          givenAnswer: 'g2',
          correct: false
        },
        {
          _id: '2',
          prompt: 'p3',
          answer: 'a3',
          givenAnswer: 'g3',
          correct: false
        },
      ];
      const { getByText, getAllByTestId } = render(<StudyReview quizId={''} cardList={cardList} onFinishReview={() => true}/>);
      expect(getByText('1 correct out of 3 - 33.33%')).toBeVisible();
      expect(getAllByTestId('study-review-list-item-container').length).toBe(3);
      expect(getAllByTestId('study-review-list-item-container')[0]).toBeVisible();
    });
  });
});