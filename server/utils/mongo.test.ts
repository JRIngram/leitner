import { MongoClient } from 'mongodb';
import {
  addCard, getAllCards, updateCard, deleteCard,
} from './mongo';

const dbName = process.env.DB_NAME;
const dbUrl = process.env.DB_URL;
const collectionName = 'test';
const { warn } = console;

afterEach(async () => {
  const client = await MongoClient.connect(dbUrl);
  const db = await client.db(dbName);
  const collection = await db.collection(collectionName);
  try {
    await collection.drop();
  } catch (err) {
    warn(`${collectionName} does not exist, so cannot be dropped.`);
  }
  await client.close();
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

describe('get all cards', () => {
  it('it can retrieve cards', async () => {
    const testPrompt = 'testPrompt';
    const testAnswer = 'testAnswer';
    await addCard(testPrompt, testAnswer);
    await addCard(testPrompt, testAnswer);
    await addCard(testPrompt, testAnswer);
    const actualCards = await getAllCards();
    expect(actualCards.length).toEqual(3);
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
