import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CardListItem from './CardListItem';

describe('CardListItem', () => {
  it('Renders initially with correct text and html', async () => {
    const testId = "test-id";
    const prompt = "i am a prompt";
    const answer = "i am an answer";
    const deleteButtonText = 'delete';
    const editButtonText = 'edit';
    
    const {getByTestId} = render(<CardListItem onEdit={() => { return true}} onDelete={() => { return true }} id={testId} prompt={prompt} answer={answer} />);
    expect(getByTestId(testId)).toHaveTextContent(prompt);
    expect(getByTestId(testId)).toHaveTextContent(answer);
    expect(getByTestId(`coloured-button-delete`)).toHaveTextContent(deleteButtonText);
    expect(getByTestId(`coloured-button-edit`)).toHaveTextContent(editButtonText);
  });
});
