import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AmendQuizzes from './AmendQuizzes';
import { addCard, getAllCards, addQuiz, getAllQuizzes } from '../../utils/axios';
import { dropAllTestCollections } from '../../../testUtils/testUtils';

beforeAll(async () => { await dropAllTestCollections() });
afterEach(async () => { await dropAllTestCollections() });

const createQuiz = async () => {
  await addCard('testPrompt', 'testAnswer');
  const returnedCard = await getAllCards();
  const cardId = returnedCard.data[0]._id;
  await addQuiz('testQuiz', 'testDescription', [cardId]);
}

const getQuizId = async () => {
  const returnedQuizzes = (await getAllQuizzes()).data;
  const firstQuiz = returnedQuizzes[0];
  return firstQuiz._id;
}

describe('rendering', () => {
  it('renders correctly when no quizzes have been created', async () => {
    const { findByText } = render(<AmendQuizzes />);
    expect(await findByText('No quizzes have been created.')).toBeVisible();
  });

  it('renders correctly when a quiz had been created', async () => {
    await createQuiz();
    const quizId = await getQuizId();
    const { findByText, queryByText, findByTestId } = render(<AmendQuizzes />);
    expect(await findByTestId(`ammend-quiz-${quizId}`)).toBeVisible();
    expect(await findByText('edit quiz')).toBeVisible();
    expect(await findByText('delete quiz')).toBeVisible();
    expect(await findByText('Name: testQuiz')).toBeVisible();
    expect(await findByText('Description: testDescription')).toBeVisible();
    expect(await findByText('testPrompt')).toBeVisible();
    expect(queryByText('No quizzes have been created.')).toBeNull();
  });
});

describe('quiz buttons', () => {
  it('deletes quiz when pressing delete quiz button', async () => {
    await createQuiz();
    const { findByText, queryByText } = render(<AmendQuizzes />);
    fireEvent.click(await findByText('delete quiz'));
    expect(await findByText('No quizzes have been created.')).toBeVisible();
    expect(queryByText('delete quiz')).toBeNull();
  });

  describe('edit quiz', () => {
    it('renders <EditQuiz /> when clicking edit quiz button', async () => {
      await createQuiz();
      const quizId = await getQuizId();
      const { findByTestId, findByText } = render(<AmendQuizzes />);
      fireEvent.click(await findByText('edit quiz'));
      expect(await findByTestId(`edit-quiz-${quizId}`)).toBeVisible();
    });

    it('leaves edit quiz mode on cancel', async () => {
      await createQuiz();
      const { findByText, queryByText } = render(<AmendQuizzes />);
      fireEvent.click(await findByText('edit quiz'));
      expect(queryByText('edit quiz')).toBeNull();
      fireEvent.click(await findByText(`cancel`));
      expect(await findByText('edit quiz')).toBeVisible();
      expect(await findByText('delete quiz')).toBeVisible();
      expect(queryByText('cancel')).toBeNull();
    });

    it('leaves edit quiz mode after updating', async () => {
      await createQuiz();
      const { findByText, queryByText } = render(<AmendQuizzes />);
      fireEvent.click(await findByText('edit quiz'));
      expect(queryByText('edit quiz')).toBeNull();
      fireEvent.click(await findByText(`confirm edit quiz`));
      expect(await findByText('edit quiz')).toBeVisible();
      expect(await findByText('delete quiz')).toBeVisible();
      expect(queryByText('cancel')).toBeNull();
    });
  });
});