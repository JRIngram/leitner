import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import { dropAllTestCollections, createQuiz} from '../../../../testUtils/testUtils';
import Study from './Study';

describe('Study', () => {
  afterAll(async () => {
    await dropAllTestCollections();
  });


  describe('with quiz not created', () => {
    beforeAll(async () => {
      await dropAllTestCollections();
    });

    it('renders StudyHome correctly when a quiz has not been created', async () => {
      const { getByText, getByTestId, findByText }= render(<Study />);
      expect(getByTestId('study-screen-home')).toBeVisible();
      expect(getByText('Study')).toBeVisible();
      expect(getByText('Study using your created flashcards and quizzes.')).toBeVisible();
      expect(getByText('Quizzes')).toBeVisible();
      expect(await findByText('No quizzes have been created. Please create quizzes in the Manage tab.')).toBeVisible();
    });
  });


  describe('with quiz created', () => {
    beforeAll(async () => {
      await createQuiz('testQuiz', 'testDescription');
    });

    it('renders StudyHome correctly when a quiz has been created', async () => {
      const { getByText, getByTestId, findByText }= render(<Study />);
      expect(getByTestId('study-screen-home')).toBeVisible();
      expect(getByText('Study')).toBeVisible();
      expect(getByText('Study using your created flashcards and quizzes.')).toBeVisible();
      expect(getByText('Quizzes')).toBeVisible();
      expect(await findByText('start quiz')).toBeVisible();
      expect(await findByText('Name: testQuiz')).toBeVisible();
      expect(await findByText('Description: testDescription')).toBeVisible();
    });

    it('renders quiz question correctly', async () => {
      const { findByTestId, findByText }= render(<Study />);
      fireEvent.click(await findByText('start quiz'));
      expect(await findByText('Question 1 of 1')).toBeVisible();
      userEvent.type(await findByTestId('answer-input'), 'test answer input')
      expect(await findByText('submit answer')).toBeVisible();
      fireEvent.click(await findByText('submit answer'));
      expect(await findByText('You said: test answer input')).toBeVisible();
      expect(await findByText('The actual answer is: testAnswer')).toBeVisible();
      expect(await findByText('correct')).toBeVisible();
      expect(await findByText('incorrect')).toBeVisible();
    });

    it('renders review screen correctly when given a correct answer', async () => {
      const { findByTestId, findByText }= render(<Study />);
      fireEvent.click(await findByText('start quiz'));
      userEvent.type(await findByTestId('answer-input'), 'test answer input')
      fireEvent.click(await findByText('submit answer'));
      fireEvent.click(await findByText('correct'));
      expect(await findByText('Quiz Review')).toBeVisible();
      expect(await findByText('finish review')).toBeVisible();
    });

    it('renders review screen correctly when given a incorrect answer', async () => {
      const { findByTestId, findByText }= render(<Study />);
      fireEvent.click(await findByText('start quiz'));
      userEvent.type(await findByTestId('answer-input'), 'test answer input')
      fireEvent.click(await findByText('submit answer'));
      fireEvent.click(await findByText('incorrect'));
      expect(await findByText('Quiz Review')).toBeVisible();
      expect(await findByText('finish review')).toBeVisible();
    });

    it('returns to StudyHome when review completed', async () => {
      const { findByTestId, findByText }= render(<Study />);
      fireEvent.click(await findByText('start quiz'));
      userEvent.type(await findByTestId('answer-input'), 'test answer input')
      fireEvent.click(await findByText('submit answer'));
      fireEvent.click(await findByText('incorrect'));
      expect(await findByText('Quiz Review')).toBeVisible();
      fireEvent.click(await findByText('finish review'));
      expect(await findByTestId('study-screen-home')).toBeVisible();
    });
  });
});