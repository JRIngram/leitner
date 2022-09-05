import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ManageQuizzesCardList } from './ManageQuizzesCardList';
import { addCard, getAllCards } from '../../utils/axios';
import { dropAllTestCollections } from '../../../testUtils/testUtils';

beforeAll(async() => {await dropAllTestCollections()});
afterEach(async() => {await dropAllTestCollections()});

describe('ManageQuizzesCardList', () => {
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
      const { findByTestId, getByText } = render(
          <ManageQuizzesCardList
            testId='manage-quizzes-card-list'
            handleCheckChange={() => true}
            selectedCardIds={[]}
          />
        )
      expect(await findByTestId('manage-quizzes-card-list')).toBeVisible();
      expect(await findByTestId(itemTestId)).toBeVisible();
      expect(await findByTestId(`${itemTestId}-checkbox-false`)).toBeVisible();
      expect(getByText('Add Card')).toBeVisible();
      expect(getByText(`Prompt: testPrompt`)).toBeVisible();
      expect(getByText(`Answer: testAnswer`)).toBeVisible();
    });
  
    it('renders correctly when a card has been created and checked', async () => {
      await addCard('testPrompt', 'testAnswer');
      const addedCards = await getAllCards();
      const addedCardId = addedCards.data[0]._id;
      const itemTestId = `manage-quiz-card-list-item-${addedCardId}`;
      const { findByTestId, getByText } = render(
          <ManageQuizzesCardList
            testId='manage-quizzes-card-list'
            handleCheckChange={() => true}
            selectedCardIds={[addedCardId]}
          />
        )
      expect(await findByTestId('manage-quizzes-card-list')).toBeVisible();
      expect(await findByTestId(itemTestId)).toBeVisible();
      expect(await findByTestId(`${itemTestId}-checkbox-true`)).toBeVisible();
      expect(getByText('Add Card')).toBeVisible();
      expect(getByText(`Prompt: testPrompt`)).toBeVisible();
      expect(getByText(`Answer: testAnswer`)).toBeVisible();
    });
  
    it('renders correctly when a card has been added and a bogus id is passed as a selected card', async () => {
      await addCard('testPrompt', 'testAnswer');
      const addedCards = await getAllCards();
      const addedCardId = addedCards.data[0]._id;
      const itemTestId = `manage-quiz-card-list-item-${addedCardId}`;
      const { findByTestId, getByText } = render(
          <ManageQuizzesCardList
            testId='manage-quizzes-card-list'
            handleCheckChange={() => true}
            selectedCardIds={['FAKE_CARD_ID']}
          />
        )
      expect(await findByTestId('manage-quizzes-card-list')).toBeVisible();
      expect(await findByTestId(itemTestId)).toBeVisible();
      expect(await findByTestId(`${itemTestId}-checkbox-false`)).toBeVisible();
      expect(getByText('Add Card')).toBeVisible();
      expect(getByText(`Prompt: testPrompt`)).toBeVisible();
      expect(getByText(`Answer: testAnswer`)).toBeVisible();
    });
  })

  describe('handleCheckChange', () => {
    it('calls handleCheckChange when checking and unchecking card card', async() => {
      await addCard('testPrompt', 'testAnswer');
      const addedCards = await getAllCards();
      const addedCardId = addedCards.data[0]._id;
      const cardCheckboxId = `manage-quiz-card-list-item-${addedCardId}-checkbox`
      const checkChangeSpy = jest.fn();
      const { findByTestId, queryByTestId } = render(
        <ManageQuizzesCardList
          testId='manage-quizzes-card-list'
          handleCheckChange={(checkChangeSpy)}
          selectedCardIds={[]}
        />
      );
  
      const selectedCheckboxAndAssertId = async (checkboxSelected: boolean) => {
        expect(await queryByTestId(`${cardCheckboxId}-${!checkboxSelected}`)).toBeNull();
        fireEvent.click(await findByTestId(`${cardCheckboxId}-${checkboxSelected}`));
        expect(await findByTestId(`${cardCheckboxId}-${!checkboxSelected}`)).toBeVisible()
        expect(await queryByTestId(`${cardCheckboxId}-${checkboxSelected}`)).toBeNull();
      }
  
      expect(checkChangeSpy).not.toBeCalled();
      await selectedCheckboxAndAssertId(false);
  
      expect(checkChangeSpy).toBeCalledTimes(1);
      await selectedCheckboxAndAssertId(true);
  
      expect(checkChangeSpy).toBeCalledTimes(2);
      await selectedCheckboxAndAssertId(false);
    });
  });
});
