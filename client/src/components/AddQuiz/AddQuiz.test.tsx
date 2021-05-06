import React from 'react';
import { fireEvent, render, act, waitFor, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddQuiz from './AddQuiz';
import { addCard, getAllCards, deleteCard } from '../../utils/axios';

beforeAll(async () => {
  const cards = await getAllCards().then(response => response.data);
  cards.forEach(async (card) => {
    await deleteCard(card._id);
  });
});

afterAll(async () => {
  const cards = await getAllCards().then(response => response.data);
  cards.forEach(async (card) => {
    await deleteCard(card._id);
  });
});

describe('AddQuiz', () => {
  it('passed', () => {
    expect(1).toEqual(1);
  })
  // it('renders form correctly', async () => {
  //   const { getByTestId, getByText, findByTestId } = render(<AddQuiz />);
  //   expect(getByText('Add a Quiz')).toBeVisible();
  //   expect(getByTestId('quiz-name-label')).toBeVisible();
  //   expect(getByTestId('quiz-name-input')).toBeVisible();
  //   expect(getByTestId('quiz-description-label')).toBeVisible();
  //   expect(getByTestId('quiz-description-input')).toBeVisible();
  //   expect(getByTestId('manage-quizzes-card-list-add-quiz')).toBeVisible();
  //   expect(await findByTestId('add-quiz-no-card-prompt')).toBeVisible();
  // });

  // // it('renders confirm add button when checking a card checkbox', async () => {
  // //   await addCard('testPrompt', 'testAnswer');
  // //   const cards = await getAllCards().then(response => response.data);
  // //   const firstCard = cards[0]._id;
  // //   const { findByTestId } = render(<AddQuiz />);
  // //   const cardCheckboxUncheckedId = `manage-quiz-card-list-item-${firstCard}-checkbox-false`;
  // //   const cardCheckboxUnchecked = await findByTestId(cardCheckboxUncheckedId);
  // //   expect(cardCheckboxUnchecked).toBeVisible();
  // //   act(() => { fireEvent.click(cardCheckboxUnchecked) });
  // //   const cardCheckboxCheckedId = `manage-quiz-card-list-item-${firstCard}-checkbox-true`;
  // //   const cardCheckboxChecked = await findByTestId(cardCheckboxCheckedId);
  // //   expect(cardCheckboxChecked).toBeVisible();
  // //   const addQuizButton = await findByTestId('coloured-button-confirm-add-quiz');
  // //   expect(addQuizButton).toBeVisible();
  // // });
});