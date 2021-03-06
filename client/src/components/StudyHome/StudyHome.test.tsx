import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StudyHome from '../StudyHome/StudyHome';
import { dropAllTestCollections, createQuiz } from '../../../../testUtils/testUtils';

describe('Study', () => {
  beforeAll(async () => await dropAllTestCollections());

  afterAll(async () => await dropAllTestCollections());
  
  describe('Rendering', () => {
    it('Renders the title correctly', () => {
      const { getByText } = render(<StudyHome onQuizSelect={() => {}} />);
      expect(getByText('Study')).toBeVisible();
      expect(getByText('Study using your created flashcards and quizzes.')).toBeVisible();
    });

    it('Renders correctly if no quiz has been added', async () => {
      const { getByText, findByText } = render(<StudyHome onQuizSelect={() => {}} />);
      expect(getByText('Quizzes')).toBeVisible();
      expect(await findByText('No quizzes have been created. Please create quizzes in the Manage tab.')).toBeVisible();
    });

    it('Renders correctly if a quiz has been added', async () => {
      await createQuiz('testQuiz', 'testDescription');
      const { getByText, findByText } = render(<StudyHome onQuizSelect={() => {}} />);
      expect(getByText('Quizzes')).toBeVisible();
      expect(await findByText('start quiz')).toBeVisible();
      expect(await findByText('Name: testQuiz')).toBeVisible();
      expect(await findByText('Description: testDescription')).toBeVisible();
    })
  });
})