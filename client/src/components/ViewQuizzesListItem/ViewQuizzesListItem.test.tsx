import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import dropCollections from '../../../../testUtils/testUtils';
import ViewQuizzesListItem from './ViewQuizzesListItem';
import { addCard, getAllCards } from '../../utils/axios';


beforeAll(async () => { await dropCollections() });
afterEach(async () => { await dropCollections() });

describe('rendering', () => {
  it('renders correctly when no cards have been added', () => {
    const { getByText, getByTestId } = render(<ViewQuizzesListItem
      id='012345'
      name='testName'
      description='testDescription'
      cardIds={[]}
    />);
    expect(getByText('Name: testName')).toBeVisible();
    expect(getByText('Description: testDescription')).toBeVisible();
    expect(getByTestId(`view-quizzes-list-item-012345-card-list`)).toBeVisible()
  });

  it('renders correctly when cards have been added', async () => {
    await addCard('testPrompt', 'testAnswer');
    const returnedCards = (await getAllCards()).data;
    const firstCard = returnedCards[0];
    const { getByText, getByTestId, findByText } = render(<ViewQuizzesListItem
      id='012345'
      name='testName'
      description='testDescription'
      cardIds={[firstCard._id]}
    />);
    expect(getByText('Name: testName')).toBeVisible();
    expect(getByText('Description: testDescription')).toBeVisible();
    expect(getByTestId(`view-quizzes-list-item-012345-card-list`)).toBeVisible();
    expect(await findByText(`${firstCard.prompt}`)).toBeVisible();
  });
});