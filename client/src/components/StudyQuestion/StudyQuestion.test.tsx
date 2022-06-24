import React from 'react'
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import StudyQuestion from './StudyQuestion';
import { dropAllTestCollections } from '../../../../testUtils/testUtils';

describe('StudyQuestion', () => {
  beforeEach(async () => {
    await dropAllTestCollections();
  });

  it('renders correctly when in non-review mode', () => {
    const { getByTestId, getByText } = render(<StudyQuestion 
      prompt='testPrompt'
      answer='testAnswer'
      currentQuestionNumber={0}
      totalQuestionCount={10}
      onQuestionFinished={() => true}
    />);

    expect(getByTestId('study-question')).toBeVisible();
    expect(getByTestId('answer-input')).toBeVisible();
    expect(getByTestId('coloured-button-submit-answer')).toBeVisible();
    expect(getByText('Question 1 of 10')).toBeVisible();
    expect(getByText('testPrompt')).toBeVisible();
  });

  it('renders correctly when in review mode', () => {
    const { getByTestId, getByText } = render(<StudyQuestion 
      prompt='testPrompt'
      answer='testAnswer'
      currentQuestionNumber={0}
      totalQuestionCount={10}
      onQuestionFinished={() => true}
    />);
    userEvent.type(getByTestId('answer-input'), 'testUserAnswer');
    fireEvent.click(getByTestId('coloured-button-submit-answer'));
    
    expect(getByText('You said: testUserAnswer')).toBeVisible();
    expect(getByText('The actual answer is: testAnswer')).toBeVisible();
    expect(getByText('Did you get the answer correct?')).toBeVisible();
    expect(getByTestId('coloured-button-correct')).toBeVisible();
    expect(getByTestId('coloured-button-incorrect')).toBeVisible();
  });

  it('calls onQuestionFinished when `correct` button is pressed', () => {
    const spy = jest.fn();
    const { getByTestId } = render(<StudyQuestion 
      prompt='testPrompt'
      answer='testAnswer'
      currentQuestionNumber={0}
      totalQuestionCount={10}
      onQuestionFinished={spy}
    />);
    userEvent.type(getByTestId('answer-input'), 'testUserAnswer');
    fireEvent.click(getByTestId('coloured-button-submit-answer'));
    expect(spy).not.toHaveBeenCalled();
    fireEvent.click(getByTestId('coloured-button-correct'));  
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('calls onQuestionFinished when `incorrect` button is pressed', () => {
    const spy = jest.fn();
    const { getByTestId } = render(<StudyQuestion 
      prompt='testPrompt'
      answer='testAnswer'
      currentQuestionNumber={0}
      totalQuestionCount={10}
      onQuestionFinished={spy}
    />);
    userEvent.type(getByTestId('answer-input'), 'testUserAnswer');
    fireEvent.click(getByTestId('coloured-button-submit-answer'));
    expect(spy).not.toHaveBeenCalled();
    fireEvent.click(getByTestId('coloured-button-incorrect'));  
    expect(spy).toHaveBeenCalledTimes(1);
  });
});