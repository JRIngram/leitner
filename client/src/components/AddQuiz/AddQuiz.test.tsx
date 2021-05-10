import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import AddQuiz from './AddQuiz';
import { addCard, getAllCards } from '../../utils/axios';
import dropCollections from '../../../../testUtils/testUtils';

beforeAll(async () => { await dropCollections()});
afterEach(async () => { await dropCollections()});

describe('renders correctly', () => {
  it('renders correctly when no cards have been created', async () => {
    const { getByText, getByTestId, findByText } = render(<AddQuiz />);
    expect(getByText('Add a Quiz')).toBeVisible();
    expect(getByText('Quiz Name')).toBeVisible();
    expect(getByTestId('add-quiz-name-input')).toBeVisible();
    expect(getByText('Description')).toBeVisible();
    expect(getByTestId('add-quiz-description-input')).toBeVisible();
    expect(getByText('A quiz must contain at least one card.')).toBeVisible();
    expect(await findByText('No cards have been created.')).toBeVisible();
  });

  it('renders correctly when a card has been created', async () => {
    await addCard("testPrompt", "testAnswer");
    const { getByText, getByTestId, findByTestId } = render(<AddQuiz />);
    expect(getByText('Add a Quiz')).toBeVisible();
    expect(getByText('Quiz Name')).toBeVisible();
    expect(getByTestId('add-quiz-name-input')).toBeVisible();
    expect(getByText('Description')).toBeVisible();
    expect(getByTestId('add-quiz-description-input')).toBeVisible();
    expect(getByText('A quiz must contain at least one card.')).toBeVisible();
    expect(await findByTestId('manage-quizzes-card-list-add-quiz')).toBeVisible();
  });
});

describe('Checkboxes', () => {
  it('allows user to check and uncheck checkbox', async () => {
    await addCard("testPrompt", "testAnswer");
    const returnedCards = await getAllCards().then(response => response.data);
    const firstCardId = returnedCards[0]._id;
    const { findByTestId, findByText } = render(<AddQuiz />);

    fireEvent.click(await findByTestId(`manage-quiz-card-list-item-${firstCardId}-checkbox-false`));
    expect(await findByTestId(`manage-quiz-card-list-item-${firstCardId}-checkbox-true`)).toBeVisible();
    expect(await findByText('confirm add quiz')).toBeVisible();

    fireEvent.click(await findByTestId(`manage-quiz-card-list-item-${firstCardId}-checkbox-true`));
    expect(await findByTestId(`manage-quiz-card-list-item-${firstCardId}-checkbox-false`)).toBeVisible();
    expect(await findByText('A quiz must contain at least one card.')).toBeVisible();
  });
});

describe('Adding a quiz', () => {
  it('allows the user to add a quiz', async () => {
    await addCard("testPrompt", "testAnswer");
    const returnedCards = await getAllCards().then(response => response.data);
    const firstCardId = returnedCards[0]._id;
    const { findByTestId, getByTestId, findByText } = render(<AddQuiz />);
    fireEvent.click(await findByTestId(`manage-quiz-card-list-item-${firstCardId}-checkbox-false`));
    userEvent.type(getByTestId('add-quiz-name-input'), 'testQuizName');
    userEvent.type(getByTestId('add-quiz-description-input'), 'testQuizDescription');
    fireEvent.click(await findByText('confirm add quiz'));
    expect(await findByText('Quiz successfully added.')).toBeVisible();
  });
})