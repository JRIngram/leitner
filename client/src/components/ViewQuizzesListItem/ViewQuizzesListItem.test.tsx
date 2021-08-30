import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { dropAllTestCollections } from '../../../../testUtils/testUtils';
import ViewQuizzesListItem from './ViewQuizzesListItem';
import { addCard, getAllCards } from '../../utils/axios';
import { CardInQuiz } from '../../../../types';


beforeAll(async () => { await dropAllTestCollections() });
afterEach(async () => { await dropAllTestCollections() });

describe('rendering', () => {
  it('renders correctly when no cards have been added', () => {
    const { getByText, queryByTestId } = render(<ViewQuizzesListItem
      id='012345'
      name='testName'
      description='testDescription'
      cardObjects={[]}
    />);
    expect(getByText('Name: testName')).toBeVisible();
    expect(getByText('Description: testDescription')).toBeVisible();
    expect(queryByTestId(`view-quizzes-list-item-012345-card-list`)).toBeNull();
  });

  it('renders correctly when cards have been added', async () => {
    await addCard('testPrompt', 'testAnswer');
    const returnedCards = (await getAllCards()).data;
    const firstCard = returnedCards[0];
    const firstCardObject: CardInQuiz = {
      _id: firstCard._id,
      box: 1,
    }
    const { getByText, findByTestId, findByText } = render(<ViewQuizzesListItem
      id='012345'
      name='testName'
      description='testDescription'
      cardObjects={[firstCardObject]}
    />);
    expect(getByText('Name: testName')).toBeVisible();
    expect(getByText('Description: testDescription')).toBeVisible();
    expect(await findByTestId(`view-quizzes-list-item-012345-card-list`)).toBeVisible();
    expect(await findByText(`${firstCard.prompt}`)).toBeVisible();
  });
});