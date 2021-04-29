import { MongoClient } from 'mongodb';
import {
  addCard, getAllCards, updateCard, deleteCard,
  addQuiz, getAllQuizzes,
} from './mongo';

const dbName = process.env.DB_NAME;
const dbUrl = typeof process.env.DB_URL === 'undefined' ? '' : process.env.DB_URL;
const cardCollectionName = 'testCards';
const quizCollectionName = 'testQuizzes';
const { warn } = console;

if (dbUrl === 'DB_URL IS NOT DEFINED') {
  throw new Error('DB_URL IS NOT DEFINED');
}

const dropCollection = async (collcetionName: string) => {
  const client = await MongoClient.connect(dbUrl);
  const db = await client.db(dbName);
  const collection = await db.collection(collcetionName);
  try {
    await collection.drop();
  } catch (err) {
    warn(`${collcetionName} does not exist, so cannot be dropped.`);
  }
  await client.close();
};

beforeAll(async () => {
  await dropCollection(cardCollectionName);
  await dropCollection(quizCollectionName);
});

afterEach(async () => {
  await dropCollection(cardCollectionName);
  await dropCollection(quizCollectionName);
});

describe('cards', () => {
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

    it('returns an array with length 5 when 5 quiz has been added', async () => {
      const testQuizName = 'testQuizName';
      const testQuizDescription = 'A test quiz';
      const testPrompt = 'testPrompt';
      const testAnswer = 'testAnswer';
      await addCard(`${testPrompt}1`, `${testAnswer}1`);
      await addCard(`${testPrompt}2`, `${testAnswer}2`);
      await addCard(`${testPrompt}3`, `${testAnswer}3`);
      const addedCards = await getAllCards();
      const cardIds = addedCards.map((card) => card._id);
      for (let i = 0; i < 5; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await addQuiz(`${testQuizName}${i}`, testQuizDescription, cardIds);
      }
      const quizzes = await getAllQuizzes();
      expect(quizzes.length).toEqual(5);
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
});
