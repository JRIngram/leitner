import {
  addCard, getAllCards, getCardsByIds, updateCard, deleteCard,
  addQuiz, getAllQuizzes, updateQuiz, deleteQuiz,
} from './mongo';
import { dropAllTestCollections } from '../../testUtils/testUtils';
import { CardInQuiz } from '../../types';

beforeAll(async () => {
  await dropAllTestCollections();
});

afterEach(async () => {
  await dropAllTestCollections();
});

describe('cards', () => {
  afterEach(async () => {
    await dropAllTestCollections();
  });

  describe('get all cards', () => {
    it('returns an empty array when no cards have been added', async () => {
      const actualCards = await getAllCards();
      expect(actualCards.length).toEqual(0);
    });

    it('can retrieve cards', async () => {
      const testPrompt = 'testPrompt';
      const testAnswer = 'testAnswer';
      await addCard(testPrompt, testAnswer);
      await addCard(testPrompt, testAnswer);
      await addCard(testPrompt, testAnswer);
      const actualCards = await getAllCards();
      expect(actualCards.length).toEqual(3);
    });
  });

  describe('add card', () => {
    it('can add card with correct parameters', async () => {
      const testPrompt = 'testPrompt';
      const testAnswer = 'testAnswer';

      const expectedString = `Added card with prompt:${testPrompt} & answer:${testAnswer}`;
      const actualString = await addCard(testPrompt, testAnswer);
      expect(actualString).toEqual(expectedString);
      const cards = await getAllCards();
      const firstCard = cards[0];
      expect(firstCard.prompt).toEqual(testPrompt);
      expect(firstCard.answer).toEqual(testAnswer);
    });
  });

  describe('get card by ids', () => {
    it('can get cards by ids', async () => {
      const testPrompt = 'testPrompt';
      const testAnswer = 'testAnswer';
      await addCard(testPrompt, testAnswer);
      await addCard(testPrompt, testAnswer);
      await addCard(testPrompt, testAnswer);
      const returnedCards = await getAllCards();
      const cardIds = returnedCards.map((card) => card._id);
      const returnedCardByIds = await getCardsByIds(cardIds);
      expect(returnedCardByIds.length).toEqual(3);
    });
  });

  describe('update card', () => {
    it('can update an added card', async () => {
      const testPrompt = 'testPrompt';
      const testAnswer = 'testAnswer';
      const updatedTestPrompt = 'testPromptUpdated';
      const updatedTestAnswer = 'testAnswerUpdated';

      await addCard(testPrompt, testAnswer);
      let cards = await getAllCards();
      let firstCard = await cards[0];
      expect(firstCard.prompt).toEqual(testPrompt);
      expect(firstCard.answer).toEqual(testAnswer);

      await updateCard(firstCard._id, updatedTestPrompt, updatedTestAnswer);
      cards = await getAllCards();
      firstCard = await cards[0];
      expect(firstCard.prompt).toEqual(updatedTestPrompt);
      expect(firstCard.answer).toEqual(updatedTestAnswer);
    });
  });

  describe('delete card', () => {
    it('can delete card after adding card ', async () => {
      const testPrompt = 'testPrompt';
      const testAnswer = 'testAnswer';
      await addCard(testPrompt, testAnswer);
      let cards = await getAllCards();
      expect(cards.length).toBe(1);
      const firstCardId = await cards[0]._id;
      await deleteCard(firstCardId);
      cards = await getAllCards();
      expect(cards.length).toBe(0);
    });
  });
});

describe('quizzes', () => {
  afterEach(async () => {
    await dropAllTestCollections();
  });

  describe('get all quizzes', () => {
    it('get all quizzes returns an empty array when no quizzes have been added', async () => {
      const quizzes = await getAllQuizzes();
      expect(quizzes.length).toEqual(0);
    });

    it('returns an array with length 1 when 1 quiz has been added', async () => {
      const testQuizName = 'testQuizName';
      const testQuizDescription = 'A test quiz';
      const testPrompt = 'testPrompt';
      const testAnswer = 'testAnswer';
      await addCard(`${testPrompt}1`, `${testAnswer}1`);
      await addCard(`${testPrompt}2`, `${testAnswer}2`);
      await addCard(`${testPrompt}3`, `${testAnswer}3`);
      const addedCards = await getAllCards();
      const cardIds = addedCards.map((card) => card._id);
      await addQuiz(testQuizName, testQuizDescription, cardIds);
      const quizzes = await getAllQuizzes();
      expect(quizzes.length).toEqual(1);
    });

    it('returns an array with length 3 when 3 quizzes have been added', async () => {
      const testQuizName = 'testQuizName';
      const testQuizDescription = 'A test quiz';
      const testPrompt = 'testPrompt';
      const testAnswer = 'testAnswer';
      await addCard(`${testPrompt}1`, `${testAnswer}1`);
      await addCard(`${testPrompt}2`, `${testAnswer}2`);
      await addCard(`${testPrompt}3`, `${testAnswer}3`);
      const addedCards = await getAllCards();
      const cardIds = addedCards.map((card) => card._id);
      await addQuiz(`${testQuizName}${1}`, testQuizDescription, cardIds);
      await addQuiz(`${testQuizName}${2}`, testQuizDescription, cardIds);
      await addQuiz(`${testQuizName}${3}`, testQuizDescription, cardIds);
      const quizzes = await getAllQuizzes();
      expect(quizzes.length).toEqual(3);
    });
  });

  it('can add a quiz', async () => {
    const testQuizName = 'testQuizName';
    const testQuizDescription = 'A test quiz';
    const testPrompt = 'testPrompt';
    const testAnswer = 'testAnswer';
    await addCard(`${testPrompt}1`, `${testAnswer}1`);
    await addCard(`${testPrompt}2`, `${testAnswer}2`);
    await addCard(`${testPrompt}3`, `${testAnswer}3`);
    const addedCards = await getAllCards();
    const cardIds = addedCards.map((card) => card._id);
    const addQuizMessage = await addQuiz(testQuizName, testQuizDescription, cardIds);
    expect(addQuizMessage).toEqual(`Created quiz with ${testQuizName}, ${testQuizDescription}, ${cardIds}`);
  });

  it('can delete a quiz', async () => {
    const testQuizName = 'testQuizName';
    const testQuizDescription = 'A test quiz';
    const testPrompt = 'testPrompt';
    const testAnswer = 'testAnswer';
    await addCard(`${testPrompt}1`, `${testAnswer}1`);
    await addCard(`${testPrompt}2`, `${testAnswer}2`);
    await addCard(`${testPrompt}3`, `${testAnswer}3`);
    const addedCards = await getAllCards();
    const cardIds = addedCards.map((card) => card._id);
    await addQuiz(testQuizName, testQuizDescription, cardIds);
    let returnedQuizzes = await getAllQuizzes();
    expect(returnedQuizzes.length).toEqual(1);
    await deleteQuiz(returnedQuizzes[0]._id);
    returnedQuizzes = await getAllQuizzes();
    expect(returnedQuizzes.length).toEqual(0);
  });

  describe('update quiz', () => {
    it('can update a quiz with all fields changing', async () => {
      const testQuizName = 'testQuizName';
      const testQuizDescription = 'A test quiz';
      const testPrompt = 'testPrompt';
      const testAnswer = 'testAnswer';

      await addCard(`${testPrompt}-1`, `${testAnswer}-1`);
      await addCard(`${testPrompt}-2`, `${testAnswer}-2`);
      const addedCards = await getAllCards();
      const cardIds = addedCards.map((card) => card._id);
      await addQuiz(testQuizName, testQuizDescription, cardIds);
      let returnedQuizzes = await getAllQuizzes();

      const testQuiz = returnedQuizzes[0];
      const expectedName = `${testQuiz.name}-updated`;
      const expectedDescription = `${testQuiz.name}-updated`;
      const cardObjectIds = testQuiz.cardObjects.map((cardObject: CardInQuiz) => cardObject._id);
      const expectedCardObjects = JSON.stringify([
        {
          _id: cardObjectIds[0],
          box: 1,
        },
        {
          _id: cardObjectIds[1],
          box: 1,
        },
      ]);
      await updateQuiz(
        testQuiz._id,
        expectedName,
        expectedDescription,
        cardObjectIds,
      );
      returnedQuizzes = await getAllQuizzes();
      const updatedTestQuiz = returnedQuizzes[0];
      expect(updatedTestQuiz._id).toEqual(testQuiz._id);
      expect(updatedTestQuiz.name).toEqual(expectedName);
      expect(updatedTestQuiz.description).toEqual(expectedDescription);
      expect(JSON.stringify(updatedTestQuiz.cardObjects)).toEqual(expectedCardObjects);
    });

    it('can update a quiz with only the name changing', async () => {
      const testQuizName = 'testQuizName';
      const testQuizDescription = 'A test quiz';
      const testPrompt = 'testPrompt';
      const testAnswer = 'testAnswer';

      await addCard(`${testPrompt}-1`, `${testAnswer}-1`);
      await addCard(`${testPrompt}-2`, `${testAnswer}-2`);
      const addedCards = await getAllCards();
      const cardIds = addedCards.map((card) => card._id);
      await addQuiz(testQuizName, testQuizDescription, cardIds);
      let returnedQuizzes = await getAllQuizzes();
      const testQuiz = returnedQuizzes[0];
      const expectedName = `${testQuiz.name}-updated`;
      const cardObjectIds = testQuiz.cardObjects.map((cardObject: CardInQuiz) => cardObject._id);
      await updateQuiz(
        testQuiz._id,
        expectedName,
        testQuiz.description,
        cardObjectIds,
      );
      returnedQuizzes = await getAllQuizzes();
      const updatedTestQuiz = returnedQuizzes[0];
      expect(updatedTestQuiz._id).toEqual(testQuiz._id);
      expect(updatedTestQuiz.name).toEqual(expectedName);
      expect(updatedTestQuiz.description).toEqual(testQuiz.description);
      expect(JSON.stringify(updatedTestQuiz.cardObjects))
        .toEqual(JSON.stringify(testQuiz.cardObjects));
    });

    it('can update a quiz with only the description changing', async () => {
      const testQuizName = 'testQuizName';
      const testQuizDescription = 'A test quiz';
      const testPrompt = 'testPrompt';
      const testAnswer = 'testAnswer';

      await addCard(`${testPrompt}-1`, `${testAnswer}-1`);
      await addCard(`${testPrompt}-2`, `${testAnswer}-2`);
      const addedCards = await getAllCards();
      const cardIds = addedCards.map((card) => card._id);
      await addQuiz(testQuizName, testQuizDescription, cardIds);
      let returnedQuizzes = await getAllQuizzes();
      const testQuiz = returnedQuizzes[0];
      const expectedDescription = `${testQuiz.description}-updated`;
      const cardObjectIds = testQuiz.cardObjects.map((cardObject: CardInQuiz) => cardObject._id);
      await updateQuiz(
        testQuiz._id,
        testQuiz.name,
        expectedDescription,
        cardObjectIds,
      );
      returnedQuizzes = await getAllQuizzes();
      const updatedTestQuiz = returnedQuizzes[0];
      expect(updatedTestQuiz._id).toEqual(testQuiz._id);
      expect(updatedTestQuiz.name).toEqual(testQuiz.name);
      expect(updatedTestQuiz.description).toEqual(expectedDescription);
      expect(JSON.stringify(updatedTestQuiz.cardObjects))
        .toEqual(JSON.stringify(testQuiz.cardObjects));
    });

    it('can update a quiz with only the cards changing', async () => {
      const testQuizName = 'testQuizName';
      const testQuizDescription = 'A test quiz';
      const testPrompt = 'testPrompt';
      const testAnswer = 'testAnswer';

      await addCard(`${testPrompt}-1`, `${testAnswer}-1`);
      await addCard(`${testPrompt}-2`, `${testAnswer}-2`);
      const addedCards = await getAllCards();
      const cardIds = addedCards.map((card) => card._id);
      await addQuiz(testQuizName, testQuizDescription, cardIds);
      let returnedQuizzes = await getAllQuizzes();
      const testQuiz = returnedQuizzes[0];
      const updatedCardId = testQuiz.cardObjects[0]._id;
      const updatedCardObject = [
        {
          _id: updatedCardId,
          box: 1,
        },
      ];
      await updateQuiz(
        testQuiz._id,
        testQuiz.name,
        testQuiz.description,
        [updatedCardId],
      );
      returnedQuizzes = await getAllQuizzes();
      const updatedTestQuiz = returnedQuizzes[0];
      expect(updatedTestQuiz._id).toEqual(testQuiz._id);
      expect(updatedTestQuiz.name).toEqual(testQuiz.name);
      expect(updatedTestQuiz.description).toEqual(testQuiz.description);
      expect(JSON.stringify(updatedCardObject[0]))
        .toEqual(JSON.stringify(testQuiz.cardObjects[0]));
    });
  });
});
