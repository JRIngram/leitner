import React from 'react';
import ManageQuizzesCardList from './ManageQuizzesCardList';
import { render, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { getAllCards, addCard, deleteCard } from '../../utils/axios';

beforeAll(async () => {
  await addCard('test-prompt', 'test-answer');
});

afterAll(async () => {
  const addedCard = await getAllCards().then(response => response.data[0]);
  const addedCardId = addedCard._id
  await deleteCard(addedCardId); 
});

describe('ManageQuizzesCardList', () => {
  const spyHandleCheckChange = jest.fn();
  const testId = 'manage-quizzes-card-list-test';
  describe('rendering', () => {
    it('renders correctly with no cards', () => {
      const { getByTestId, getByText } = render(
        <ManageQuizzesCardList 
          handleCheckChange={spyHandleCheckChange}
          testId={testId}
          selectedCardIds={[]}
        />
      );
      expect(getByTestId(testId)).toBeVisible();
      expect(getByText('Loading cards...')).toBeVisible();
    });

    it('renders correctly with cards', async () => {
      const addedCard = await getAllCards().then(response => response.data[0]);
      const addedCardId = addedCard._id
      const { getByTestId } = render(
        <ManageQuizzesCardList 
          handleCheckChange={spyHandleCheckChange}
          testId={testId}
          selectedCardIds={[addedCardId]}
        />
      );
      expect(getByTestId(testId)).toBeVisible();
      await waitFor(() => {
        expect(getByTestId(`manage-quiz-card-list-item-${addedCardId}`)).toBeVisible();
      });
    });
  });
})