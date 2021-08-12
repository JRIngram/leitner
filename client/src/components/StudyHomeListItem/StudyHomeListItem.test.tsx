import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StudyHomeListItem from './StudyHomeListItem';

describe('StudyHomeListItem', () => {
  it('Renders correctly', () => {
    const quiz = {
      _id: '000000000000',
      name: "Test Quiz",
      description: "A quiz for testing",
      cardObjects: []
    }

    const { getByText, getByTestId } = render(
        <StudyHomeListItem 
          quiz={quiz}
          onQuizSelect={() => {}}
        />
      );
    expect(getByText('Quiz Boxes:')).toBeVisible();
    expect(getByTestId('quiz-box-dropdown')).toBeVisible();
  });

  it('Calls onQuizSelect on button press', () => {
    const quiz = {
      _id: '000000000000',
      name: "Test Quiz",
      description: "A quiz for testing",
      cardObjects: []
    }

    const testOnQuizSelect = jest.fn();
    
    const { getByText } = render(
      <StudyHomeListItem 
        quiz={quiz}
        onQuizSelect={() => { testOnQuizSelect() }}
      />
    );

    expect(testOnQuizSelect).toHaveBeenCalledTimes(0);
    fireEvent.click(getByText('start quiz'));
    expect(testOnQuizSelect).toHaveBeenCalledTimes(1);
  });
});