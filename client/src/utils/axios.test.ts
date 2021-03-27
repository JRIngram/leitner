import { MongoClient } from 'mongodb';
import {addCard, getAllCards, updateCard, deleteCard} from './axios';

const dbName = 'leitner';
const dbUrl = 'mongodb://127.0.0.1';
const cardCollectionName = 'testCards';
const { warn } = console;


afterEach(async () => {
  const client = await MongoClient.connect(dbUrl);
  const db = await client.db(dbName);
  const collection = await db.collection(cardCollectionName);
  try {
    await collection.drop();
  } catch (err) {
    warn(`${cardCollectionName} does not exist, so cannot be dropped.`);
  }
  await client.close();
});

describe('add', () => {
  it('returns status 200', async () => {
    const response = await addCard("test", "test");
    expect(response.status).toEqual(200);
  });
});

describe('getAllCards', () => {
  it('returns status 200', async () => {
    const response = await getAllCards();
    expect(response.status).toEqual(200);
  });

  it('returns cards', async () => {
    await addCard("testPrompt", "testAnswer");
    const cards = await (await getAllCards()).data;
    const firstCard = cards[0];
    expect(firstCard.prompt).toEqual('testPrompt');
    expect(firstCard.answer).toEqual('testAnswer');
  });
})

describe('deleteCard', () => {
  it('returns status 200', async () => {
    await addCard("test", "test");
    const cards = await (await getAllCards()).data;
    const firstCardId = cards[0]._id;
    expect(firstCardId).not.toBeUndefined();
    const response = await deleteCard(firstCardId);
    expect(response.status).toEqual(200);
  });
});

describe('updateCard', () => {
  it('returns status 200', async () => {
    await addCard("test", "test");
    const cards = await (await getAllCards()).data;
    const firstCardId = cards[0]._id;
    expect(firstCardId).not.toBeUndefined();
    const response = await updateCard(firstCardId, "updatedTestPrompt", "updatedTestAnswer");
    expect(response.status).toEqual(200);
  });
});