import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ManageQuizzesCardList from './ManageQuizzesCardList';
import '@testing-library/jest-dom/extend-expect';
import { addCard, getAllCards } from '../../utils/axios';
import { dropAllTestCollections } from '../../../../testUtils/testUtils';

beforeAll(async() => {await dropAllTestCollections()});
afterEach(async() => {await dropAllTestCollections()});

describe('rendering', () => {
  it('renders correctly when no cards have been created', async () => {
    const { getByTestId, findByText } = render(
      <ManageQuizzesCardList
        testId='manage-quizzes-card-list'
        handleCheckChange={() => true}
        selectedCardIds={[]}
      />
    );
    expect(getByTestId('manage-quizzes-card-list')).toBeVisible();
    expect(await findByText('No cards have been created.')).toBeVisible();
  });

  it('renders correctly when a card has been created but not checked', async () => {
    await addCard('testPrompt', 'testAnswer');
    const addedCards = await getAllCards();
    const addedCardId = addedCards.data[0]._id;
    const itemTestId = `manage-quiz-card-list-item-${addedCardId}`;
    const { findByTestId } = render(
        <ManageQuizzesCardList
          testId='manage-quizzes-card-list'
          handleCheckChange={() => true}
          selectedCardIds={[]}
        />
      )
    expect(await findByTestId('manage-quizzes-card-list')).toBeVisible();
    expect(await findByTestId(itemTestId)).toBeVisible();
    expect(await findByTestId(`${itemTestId}-checkbox-false`)).toBeVisible();
  });

  it('renders correctly when a card has been created and checked', async () => {
    await addCard('testPrompt', 'testAnswer');
    const addedCards = await getAllCards();
    const addedCardId = addedCards.data[0]._id;
    const itemTestId = `manage-quiz-card-list-item-${addedCardId}`;
    const { findByTestId } = render(
        <ManageQuizzesCardList
          testId='manage-quizzes-card-list'
          handleCheckChange={() => true}
          selectedCardIds={[addedCardId]}
        />
      )
    expect(await findByTestId('manage-quizzes-card-list')).toBeVisible();
    expect(await findByTestId(itemTestId)).toBeVisible();
    expect(await findByTestId(`${itemTestId}-checkbox-true`)).toBeVisible();
  });

  it('renders correctly when a card has been added and a bogus id is passed as a selected card', async () => {
    await addCard('testPrompt', 'testAnswer');
    const addedCards = await getAllCards();
    const addedCardId = addedCards.data[0]._id;
    const itemTestId = `manage-quiz-card-list-item-${addedCardId}`;
    const { findByTestId } = render(
        <ManageQuizzesCardList
          testId='manage-quizzes-card-list'
          handleCheckChange={() => true}
          selectedCardIds={['FAKE_CARD_ID']}
        />
      )
    expect(await findByTestId('manage-quizzes-card-list')).toBeVisible();
    expect(await findByTestId(itemTestId)).toBeVisible();
    expect(await findByTestId(`${itemTestId}-checkbox-false`)).toBeVisible();
  });
});

describe('handleCheckChange', () => {
  it('calls handleCheckChange when checking card', async() => {
    await addCard('testPrompt', 'testAnswer');
    const addedCards = await getAllCards();
    const addedCardId = addedCards.data[0]._id;
    const cardCheckboxId = `manage-quiz-card-list-item-${addedCardId}-checkbox`
    const checkChangeSpy = jest.fn();
    const { findByTestId, queryByTestId } = render(
      <ManageQuizzesCardList
        testId='manage-quizzes-card-list'
        handleCheckChange={(checkChangeSpy)}
        selectedCardIds={[addedCardId]}
      />
    );

    const checkNonVisibleCheckboxAndClick = async (visibleCheckboxChecked: boolean) => {
      expect(queryByTestId(`${cardCheckboxId}-${visibleCheckboxChecked}`)).toBeNull();
      fireEvent.click(await findByTestId(`${cardCheckboxId}-${!visibleCheckboxChecked}`));
    }

    expect(checkChangeSpy).not.toBeCalled();
    await checkNonVisibleCheckboxAndClick(false);

    expect(checkChangeSpy).toBeCalledTimes(1);
    await checkNonVisibleCheckboxAndClick(true);

    expect(checkChangeSpy).toBeCalledTimes(2);
    await checkNonVisibleCheckboxAndClick(false);
  });
});
