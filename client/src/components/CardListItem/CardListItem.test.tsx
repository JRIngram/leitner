// import dependencies
import React from 'react'
import ReactDOM from 'react-dom';

// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect'
import CardListItem from './CardListItem';

test('Renders with correct text and html', async () => {
  const testId = "test-id";
  const prompt = "i am a prompt";
  const answer = "i am an answer";
  const expectedHTML = `<details data-testid="${testId}"><summary>This is an example prompt... / this is an example answer...<span><button>Edit</button><button>Delete</button></span></summary><p>Prompt: ${prompt} </p><p>Answer: ${answer}</p></details>`;
  
  const {getByTestId} = render(<CardListItem id={testId} prompt={prompt} answer={answer} />);
  expect(getByTestId(testId)).toHaveTextContent(prompt);
  expect(getByTestId(testId)).toHaveTextContent(answer);
  expect(getByTestId('test-id')).toContainHTML(expectedHTML);
});