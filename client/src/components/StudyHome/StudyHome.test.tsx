import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StudyHome from '../StudyHome/StudyHome';
import { dropAllTestCollections, createQuiz } from '../../../testUtils/testUtils';

describe('Study', () => {
  beforeAll(async () => await dropAllTestCollections());

  afterAll(async () => await dropAllTestCollections());

  it('Renders the title correctly', () => {
    const { getByText } = render(<StudyHome onQuizSelect={() => true} />);
    expect(getByText('Study')).toBeVisible();
    expect(getByText('Study using your created flashcards and quizzes.')).toBeVisible();
  });

  it('Renders correctly if no quiz has been added', async () => {
    const { getByText, findByText } = render(<StudyHome onQuizSelect={() => true} />);
    expect(getByText('Quizzes')).toBeVisible();
    expect(await findByText('No quizzes have been created. Please create quizzes in the Manage tab.')).toBeVisible();
  });

  describe('quizzes added', () => {
    beforeAll(async () => {
      await createQuiz('testQuiz', 'testDescription');
    });

    it('Renders correctly if a quiz has been added', async () => {
      const { findByText, findByTestId, findByRole } = render(<StudyHome onQuizSelect={() => true} />);

      expect(await findByTestId('quiz-box-dropdown')).toBeVisible();
      expect(await findByRole('button', { name: /start quiz/i })).toBeVisible();
      expect(await findByText('Name: testQuiz')).toBeVisible();
      expect(await findByText('Description: testDescription')).toBeVisible();
      expect(await findByText('Quizzes')).toBeVisible();
      expect(await findByText('Quiz Boxes:')).toBeVisible();
    });

    it('Calls onQuizSelect when start quiz button is pressed', async () => {
      const spy = jest.fn();
      const { findByRole } = render(<StudyHome onQuizSelect={spy} />);
      const startQuizButton = await findByRole('button', { name: /start quiz/i });

      fireEvent.click(startQuizButton);

      expect(spy).toHaveBeenCalledTimes(1);
    });
  })


});