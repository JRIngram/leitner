import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddQuiz from './AddQuiz';
import { addCard } from '../../utils/axios';
import dropCollections from '../../../../testUtils/testUtils';

afterEach(async () => { await dropCollections()});

describe('renders correctly', () => {
  it('renders correctly when no cards have been created', () => {
    const { getByText, getByTestId } = render(<AddQuiz />);
    expect(getByText('Add a Quiz')).toBeVisible();
    expect(getByText('Quiz Name')).toBeVisible();
    expect(getByTestId('add-quiz-name-input')).toBeVisible();
    expect(getByText('Description')).toBeVisible();
    expect(getByTestId('add-quiz-description-input')).toBeVisible();
    expect(getByText('A quiz must contain at least one card.')).toBeVisible();
    expect(getByText('No cards have been created.')).toBeVisible();
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
