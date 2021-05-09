import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ManageCards from './ManageCards';
import { addCard, getAllCards } from '../../utils/axios';
import dropAllTestCollections from '../../../../testUtils/testUtils';

beforeAll(async () => { await dropAllTestCollections()});
afterEach(async () => { await dropAllTestCollections()});

describe('rendering', () => {
  it('renders correctly when no cards have been added', async () => {
    const { getByText, getByTestId, findByText } = render(<ManageCards />);
    expect(getByTestId('manage-cards')).toBeVisible();
    expect(getByText('add cards')).toBeVisible();
    expect(await findByText('No cards have been created.')).toBeVisible();
  });

  it('renders correctly when a card has been added', async () => {
    await addCard('testPrompt', 'testAnswer');
    const returnedCards = await getAllCards().then(response => response.data);
    const firstCardId = returnedCards[0]._id;
    const { getByText, getByTestId, findByText } = render(<ManageCards />);
    expect(getByTestId('manage-cards')).toBeVisible();
    expect(getByText('add cards')).toBeVisible();
    expect(await findByText('Prompt: testPrompt')).toBeVisible();
    expect(await findByText('Answer: testAnswer')).toBeVisible();
    expect(getByTestId(`manage-card-list-item-${firstCardId}`)).toBeVisible();
  });
});

describe('adding card', () => {
  it('user can add a card', async() => {
    const { getByText, getByTestId, queryByText, findByText } = render(<ManageCards />);
    fireEvent.click(getByText('add cards'));
    expect(queryByText('testPrompt')).toBeNull();
    expect(queryByText('testAnswer')).toBeNull();
    userEvent.type(getByTestId('card-form-prompt-input'), 'testPrompt');
    userEvent.type(getByTestId('card-form-answer-input'), 'testAnswer');
    fireEvent.click(getByText('add card'));
    expect(await findByText('Prompt: testPrompt')).toBeVisible();
    expect(await findByText('Answer: testAnswer')).toBeVisible();
  });

  it('user can cancel adding a card', () => {
    const { getByText, getByTestId, queryByTestId } = render(<ManageCards />);
    fireEvent.click(getByText('add cards'));
    userEvent.type(getByTestId('card-form-prompt-input'), 'testPrompt');
    userEvent.type(getByTestId('card-form-answer-input'), 'testAnswer');
    fireEvent.click(getByText('cancel'));
    expect(queryByTestId('card-form-prompt-input')).toBeNull();
    expect(queryByTestId('card-form-answer-input')).toBeNull();
  });
});

describe('buttons on added cards', () => {
  it('can press edit button', async () => {
    const { getByText, getByTestId, queryByText, findByText } = render(<ManageCards />);
    fireEvent.click(getByText('add cards'));
    expect(queryByText('testPrompt')).toBeNull();
    expect(queryByText('testAnswer')).toBeNull();
    userEvent.type(getByTestId('card-form-prompt-input'), 'testPrompt');
    userEvent.type(getByTestId('card-form-answer-input'), 'testAnswer');
    fireEvent.click(await findByText('add card'));
    fireEvent.click(await findByText('edit'));
    userEvent.clear(getByTestId('card-form-prompt-input'));
    userEvent.clear(getByTestId('card-form-answer-input'));
    userEvent.type(getByTestId('card-form-prompt-input'), 'editedPrompt');
    userEvent.type(getByTestId('card-form-answer-input'), 'editedAnswer');
    fireEvent.click(await findByText('edit card'));
    expect(await findByText('Prompt: editedPrompt')).toBeVisible();
    expect(await findByText('Answer: editedAnswer')).toBeVisible();
  });

  it('can add and delete cards', async () => {
    const { getByText, getByTestId, queryByText, findByText } = render(<ManageCards />);
    fireEvent.click(getByText('add cards'));
    expect(queryByText('testPrompt')).toBeNull();
    expect(queryByText('testAnswer')).toBeNull();
    userEvent.type(getByTestId('card-form-prompt-input'), 'testPrompt');
    userEvent.type(getByTestId('card-form-answer-input'), 'testAnswer');
    fireEvent.click(await findByText('add card'));
    expect(await findByText('Prompt: testPrompt')).toBeVisible();
    expect(await findByText('Answer: testAnswer')).toBeVisible();
    fireEvent.click(await findByText('delete'));
    await waitFor(() => {
      expect(queryByText('Prompt: testPrompt')).toBeNull();
      expect(queryByText('Answer: testAnswer')).toBeNull();
    });
  });
});