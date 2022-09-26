import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ManageQuizzes from './ManageQuizzes';

describe('rendering', () => {
  describe('add quiz', () => {
    it('renders default / add quiz subscreen correctly', () => {
      const { getByText } = render(<ManageQuizzes />);
      expect(getByText('add quiz')).toBeVisible();
      expect(getByText('amend quizzes')).toBeVisible();
      expect(getByText('Add a Quiz')).toBeVisible();
    });

    it('stays on add quiz subscreen when clicking add quiz button', async () => {
      const { getByText, findByText } = render(<ManageQuizzes />);
      expect(getByText('add quiz')).toBeVisible();
      expect(getByText('amend quizzes')).toBeVisible();
      fireEvent.click(getByText('add quiz'));
      expect(await findByText('add quiz')).toBeVisible();
      expect(await findByText('amend quizzes')).toBeVisible();
    });
  });

  describe('amend quizzes', () => {
    it('renders default / add quiz subscreen correctly', async () => {
      const { getByText, findByText } = render(<ManageQuizzes />);
      fireEvent.click(getByText('amend quizzes'));
      expect(await findByText('add quiz')).toBeVisible();
      expect(await findByText('amend quizzes')).toBeVisible();
      expect(await findByText('No quizzes have been created.')).toBeVisible();
    });

    it('stays on amend quizzes subscreen when clicking add quiz button', async() => {
      const { getByText, findByText } = render(<ManageQuizzes />);
      fireEvent.click(getByText('amend quizzes'));
      expect(await findByText('add quiz')).toBeVisible();
      expect(await findByText('amend quizzes')).toBeVisible();
      expect(await findByText('No quizzes have been created.')).toBeVisible();
      fireEvent.click(getByText('amend quizzes'));
      expect(await findByText('add quiz')).toBeVisible();
      expect(await findByText('amend quizzes')).toBeVisible();
      expect(await findByText('No quizzes have been created.')).toBeVisible();
    });

    it('user can return to add quiz page from amend quizzes', async() => {
      const { getByText, findByText } = render(<ManageQuizzes />);
      fireEvent.click(getByText('amend quizzes'));
      expect(await findByText('add quiz')).toBeVisible();
      expect(await findByText('amend quizzes')).toBeVisible();
      expect(await findByText('No quizzes have been created.')).toBeVisible();
      fireEvent.click(getByText('add quiz'));
      expect(await findByText('add quiz')).toBeVisible();
      expect(await findByText('amend quizzes')).toBeVisible();
      expect(await findByText('Add a Quiz')).toBeVisible();
    });
  });
});