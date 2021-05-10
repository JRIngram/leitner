import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ManageCardListItem from './ManageCardsListItem';

describe('CardListItem', () => {
  it('Renders initially with correct text and html', async () => {
    const testCardId = 'testCardId';
    const testId = `manage-card-list-item-${testCardId}`;
    const prompt = "i am a prompt";
    const answer = "i am an answer";
    const deleteButtonText = 'delete';
    const editButtonText = 'edit';
    
    const {getByTestId} = render(<ManageCardListItem onEdit={() => { return true}} onDelete={() => { return true }} id='testCardId' prompt={prompt} answer={answer} />);
    expect(getByTestId(testId)).toHaveTextContent(prompt);
    expect(getByTestId(testId)).toHaveTextContent(answer);
    expect(getByTestId(`coloured-button-delete`)).toHaveTextContent(deleteButtonText);
    expect(getByTestId(`coloured-button-edit`)).toHaveTextContent(editButtonText);
  });
});
