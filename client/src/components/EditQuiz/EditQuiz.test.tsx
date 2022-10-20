import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect';
import EditQuiz from './EditQuiz';
import { addCard, getAllCards, addQuiz, getAllQuizzes } from '../../utils/axios';
import { dropAllTestCollections } from '../../../testUtils/testUtils';

const createQuiz = async () => {
  await addCard('testPrompt', 'testAnswer');
  const returnedCard = await getAllCards();
  const cardId = returnedCard.data[0]._id;
  await addQuiz('testQuiz', 'testDescription', [cardId]);
}

const getQuizId = async () => {
  const returnedQuizzes = (await getAllQuizzes()).data;
  const firstQuiz = returnedQuizzes[0];
  return firstQuiz._id;
}

const getCard = async (index: number) => {
  const returnedCards = (await getAllCards()).data;
  return returnedCards[index];
}

describe('Edit Quiz', () => {
  beforeAll(async () => { await dropAllTestCollections() });
  afterEach(async () => { await dropAllTestCollections() });


  describe('render', () => {
    it('renders correctly if quiz has no cards', async () => {
      await createQuiz();
      const quizId = await getQuizId();
      const onCancelSpy = jest.fn();
      const afterUpdateSpy = jest.fn();

      const { getByText, queryByText } = render(
        <EditQuiz
          quizName="testQuiz"
          quizDescription="testDescription"
          quizId={quizId}
          cardsInQuiz={[]}
          onCancel={onCancelSpy}
          afterUpdate={afterUpdateSpy}
        />
      );
      expect(getByText('A quiz must contain at least one card')).toBeVisible();
      expect(getByText('cancel')).toBeVisible();
      expect(queryByText('confirm edit quiz')).toBeNull();
    });

    it('renders correctly if quiz has cards', async () => {
      await createQuiz();
      const quizId = await getQuizId();
      await addCard('testPrompt2', 'testAnswer2');
      const firstCard = await getCard(0);
      const secondCard = await getCard(1);
      const onCancelSpy = jest.fn();
      const afterUpdateSpy = jest.fn();

      const { getByText, findByText, getByTestId, findAllByText } = render(
        <EditQuiz
          quizName="testQuiz"
          quizDescription="testDescription"
          quizId={quizId}
          cardsInQuiz={[firstCard._id]}
          onCancel={onCancelSpy}
          afterUpdate={afterUpdateSpy}
        />
      );

      expect(await findByText('confirm edit quiz')).toBeVisible();
      expect(await findByText('cancel')).toBeVisible();

      const addCardLabels = await findAllByText('Add Card');
      expect(addCardLabels.length).toEqual(2);

      expect(getByTestId(`manage-quiz-card-list-item-${firstCard._id}-checkbox-true`)).toBeVisible();
      expect(getByText(`Prompt: ${firstCard.prompt}`)).toBeVisible();
      expect(getByText(`Answer: ${firstCard.answer}`)).toBeVisible();

      expect(getByTestId(`manage-quiz-card-list-item-${secondCard._id}-checkbox-false`)).toBeVisible();
      expect(getByText(`Prompt: ${secondCard.prompt}`)).toBeVisible();
      expect(getByText(`Answer: ${secondCard.answer}`)).toBeVisible();
    });
  });

  describe('prop callbacks', () => {
    it('calls callback on cancel button being pressed', async () => {
      await createQuiz();
      const quizId = await getQuizId();
      const firstCard = await getCard(0);
      const onCancelSpy = jest.fn();
      const afterUpdateSpy = jest.fn();

      const { findByText } = render(
        <EditQuiz
          quizName="testQuiz"
          quizDescription="testDescription"
          quizId={quizId}
          cardsInQuiz={[firstCard._id]}
          onCancel={onCancelSpy}
          afterUpdate={afterUpdateSpy}
        />
      );

      expect(onCancelSpy).toBeCalledTimes(0);
      fireEvent.click(await findByText('cancel'));
      expect(onCancelSpy).toBeCalledTimes(1);
    });

    it('calls callback on confirm edit button being pressed', async () => {
      await createQuiz();
      const quizId = await getQuizId();
      const firstCard = await getCard(0);
      const onCancelSpy = jest.fn();
      const afterUpdateSpy = jest.fn();

      const { findByText } = render(
        <EditQuiz
          quizName="testQuiz"
          quizDescription="testDescription"
          quizId={quizId}
          cardsInQuiz={[firstCard._id]}
          onCancel={onCancelSpy}
          afterUpdate={afterUpdateSpy}
        />
      );

      expect(afterUpdateSpy).toBeCalledTimes(0);
      fireEvent.click(await findByText('confirm edit quiz'));
      await waitFor(() => expect(afterUpdateSpy).toBeCalledTimes(1));
    });
  });

  describe('editing quizzes', () => {
    it('buttons are still present after ammending quiz', async () => {
      await createQuiz();
      const quizId = await getQuizId();
      await addCard('testPrompt2', 'testAnswer2');
      const firstCard = await getCard(0);
      const secondCard = await getCard(1);
      const onCancelSpy = jest.fn();
      const afterUpdateSpy = jest.fn();

      const { getByText, getByTestId, findByTestId } = render(
        <EditQuiz
          quizName="testQuiz"
          quizDescription="testDescription"
          quizId={quizId}
          cardsInQuiz={[firstCard._id]}
          onCancel={onCancelSpy}
          afterUpdate={afterUpdateSpy}
        />
      );

      userEvent.clear(getByTestId(`edit-quiz-${quizId}-name-input`));
      userEvent.type(getByTestId(`edit-quiz-${quizId}-name-input`), "updated quiz name");
      userEvent.clear(getByTestId(`edit-quiz-${quizId}-description-input`));
      userEvent.type(getByTestId(`edit-quiz-${quizId}-description-input`), "updated quiz description");
      fireEvent.click(await findByTestId(`manage-quiz-card-list-item-${firstCard._id}-checkbox-true`));
      fireEvent.click(await findByTestId(`manage-quiz-card-list-item-${secondCard._id}-checkbox-false`));
      expect(getByText('cancel')).toBeVisible();
      expect(getByText('confirm edit quiz')).toBeVisible();
    });
  });
});