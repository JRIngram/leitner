import React from 'react';
import EditQuiz from './EditQuiz';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('EditQuiz', () => {
  const spyOnCancel = jest.fn();
  const spyAfterUpdate = jest.fn();
  const quizId = "test-quiz-id";

  describe('corretly renders', () => {
    it('renders with no cards', () => {
      const {getByTestId, getByText} = render(
        <EditQuiz 
          quizId={quizId}
          quizName="test-name"
          quizDescription="test-decription"
          cardsInQuiz={[]}
          onCancel={spyOnCancel}
          afterUpdate={spyAfterUpdate}
        />
      );
      expect(getByTestId(`edit-quiz-${quizId}`)).toBeVisible();
      expect(getByTestId(`edit-quiz-${quizId}-header`)).toBeVisible();
      expect(getByTestId(`edit-quiz-${quizId}-name-label`)).toBeVisible();
      expect(getByTestId(`edit-quiz-${quizId}-name-input`)).toBeVisible();
      expect(getByTestId(`edit-quiz-${quizId}-description-label`)).toBeVisible();
      expect(getByTestId(`edit-quiz-${quizId}-description-input`)).toBeVisible();
      expect(getByTestId(`manage-quizzes-card-list-${quizId}`)).toBeVisible();
      expect(getByText('A quiz must contain at least one card')).toBeVisible();
      expect(getByTestId(`coloured-button-cancel`)).toBeVisible();
    });
  
    it('renders with cards', () => {
      const {getByTestId} = render(
        <EditQuiz 
          quizId={quizId}
          quizName="test-name"
          quizDescription="test-decription"
          cardsInQuiz={['0']}
          onCancel={spyOnCancel}
          afterUpdate={spyAfterUpdate}
        />
      );
      expect(getByTestId(`edit-quiz-${quizId}`)).toBeVisible();
      expect(getByTestId(`edit-quiz-${quizId}-header`)).toBeVisible();
      expect(getByTestId(`edit-quiz-${quizId}-name-label`)).toBeVisible();
      expect(getByTestId(`edit-quiz-${quizId}-name-input`)).toBeVisible();
      expect(getByTestId(`edit-quiz-${quizId}-description-label`)).toBeVisible();
      expect(getByTestId(`edit-quiz-${quizId}-description-input`)).toBeVisible();
      expect(getByTestId(`manage-quizzes-card-list-${quizId}`)).toBeVisible();
      expect(getByTestId('coloured-button-confirm-edit-quiz')).toBeVisible();
      expect(getByTestId(`coloured-button-cancel`)).toBeVisible();
    });
  });

  describe('callbacks on buttons', () => {
    it('fires the on cancel event', () => {
      const { getByTestId } = render(
        <EditQuiz 
          quizId={quizId}
          quizName="test-name"
          quizDescription="test-decription"
          cardsInQuiz={[]}
          onCancel={spyOnCancel}
          afterUpdate={spyAfterUpdate}
        />
      );
      expect(spyOnCancel).not.toBeCalled();
      fireEvent.click(getByTestId('coloured-button-cancel'));
      expect(spyOnCancel).toBeCalled();
    });
  });
});