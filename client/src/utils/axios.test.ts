import { MongoClient } from 'mongodb';
import {addCard, getAllCards, updateCard, deleteCard, addQuiz, getAllQuizzes} from './axios';

const dbName = 'leitner';
const dbUrl = 'mongodb://127.0.0.1';
const cardCollectionName = 'testCards';
const quizCollectionName = 'testQuizzes';
const { warn } = console;

const dropCollection = async (collcetionName: string) => {
  const client = await MongoClient.connect(dbUrl);
  const db = await client.db(dbName);
  const collection = await db.collection(collcetionName);
  try {
    await collection.drop();
  } catch (err) {
    
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
    const cards = await getAllCards().then(response => response.data);
    const firstCard = cards[0];
    expect(firstCard.prompt).toEqual('testPrompt');
    expect(firstCard.answer).toEqual('testAnswer');
  });
})

describe('deleteCard', () => {
  it('returns status 200', async () => {
    await addCard("test", "test");
    const cards = await getAllCards().then(response => response.data);
    const firstCardId = cards[0]._id;
    expect(firstCardId).not.toBeUndefined();
    const response = await deleteCard(firstCardId);
    expect(response.status).toEqual(200);
  });
});

describe('updateCard', () => {
  it('returns status 200', async () => {
    await addCard("test", "test");
    const cards = await getAllCards().then(response => response.data);
    const firstCardId = cards[0]._id;
    expect(firstCardId).not.toBeUndefined();
    const response = await updateCard(firstCardId, "updatedTestPrompt", "updatedTestAnswer");
    expect(response.status).toEqual(200);
  });
});

describe('addQuiz', () => {
  it('returns status 200', async () => {
    const response = await addQuiz('test name','test description', ['000000000000','111111111111', '222222222222']);
    expect(response.status).toEqual(200);
  })
});

describe('getAllQuizzes', () => {
  it('returns status 200', async () => {
    await addQuiz('test name','test description', ['000000000000','111111111111', '222222222222']);
    const response = await getAllQuizzes();
    expect(response.status).toEqual(200);
  });

  it('returns an empty array if no quiz has been added', async () => {
    const response = await getAllQuizzes();
    expect(response.data).toEqual([]);
  });

  it('returns an array with content if a quiz has been added', async () => {
    await addQuiz('test name','test description', ['000000000000','111111111111', '222222222222']);
    const response = await getAllQuizzes();
    expect(response.data.length).toEqual(1);
    const quizResponse = response.data[0];
    expect(quizResponse.name).toEqual('test name');
    expect(quizResponse.description).toEqual('test description');
  });
});

describe('deleteQuiz', () => {
  it('returns status 200', async () => {
    const response = await addQuiz('test name','test description', ['000000000000','111111111111', '222222222222']);
    expect(response.status).toEqual(200);
  });
});