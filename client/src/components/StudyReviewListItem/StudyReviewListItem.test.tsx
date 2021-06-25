import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StudyReviewListItem from './StudyReviewListItem'

jest.mock('@fortawesome/react-fontawesome/index.js', () => {
  return {
    FontAwesomeIcon: 'div'
  }
});

jest.mock('@fortawesome/free-solid-svg-icons', () => {
  return '';
});

describe('StudyReviewListItem', () => {
  it('Renders correct review item correctly', () => {
    const card = {
      _id: '0',
      prompt: 'I am a prompt',
      answer: 'I am the correct answer',
      givenAnswer: 'I am the given answer',
      correct: true
    }
    const { getByText } = render(<StudyReviewListItem reviewItem={card}/>)
    expect(getByText('Prompt: I am a prompt')).toBeVisible();
    expect(getByText('Your Answer: I am the given answer')).toBeVisible();
    expect(getByText('Actual Answer: I am the correct answer')).toBeVisible();
  });

  it('Renders incorrect review item correctly', () => {
    const card = {
      _id: '0',
      prompt: 'I am a prompt',
      answer: 'I am the incorrect answer',
      givenAnswer: 'I am the given answer',
      correct: false
    }
    const { getByText } = render(<StudyReviewListItem reviewItem={card}/>)
    expect(getByText('Prompt: I am a prompt')).toBeVisible();
    expect(getByText('Your Answer: I am the given answer')).toBeVisible();
    expect(getByText('Actual Answer: I am the incorrect answer')).toBeVisible();
  });
});