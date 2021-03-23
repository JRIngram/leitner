// import dependencies
import React from 'react'
import ReactDOM from 'react-dom';

// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'
import CardListItem from './CardListItem';

it('Renders with correct text and html', async () => {
  const testId = "test-id";
  const prompt = "i am a prompt";
  const answer = "i am an answer";
  const deleteButtonText = 'delete';
  const editButtonText = 'edit';
  
  const {getByTestId} = render(<CardListItem onDelete={() => { return true }} id={testId} prompt={prompt} answer={answer} />);
  expect(getByTestId(testId)).toHaveTextContent(prompt);
  expect(getByTestId(testId)).toHaveTextContent(answer);
  expect(getByTestId(`coloured-button-delete`)).toHaveTextContent(deleteButtonText);
  expect(getByTestId(`coloured-button-edit`)).toHaveTextContent(editButtonText);
});