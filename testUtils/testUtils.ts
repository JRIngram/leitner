import { MongoClient } from 'mongodb';
import { addCard, getAllCards, addQuiz } from '../client/src/utils/axios';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const dbName = process.env.DB_NAME;
const dbUrl = typeof process.env.DB_URL === 'undefined' ? '' : process.env.DB_URL;
const cardCollectionName = 'testCards';
const quizCollectionName = 'testQuizzes';

const dropCollection = async (collcetionName: string) => {
  const client = await MongoClient.connect(dbUrl);
  const db = await client.db(dbName);
  const collection = await db.collection(collcetionName);
  try {
    await collection.drop();
  // eslint-disable-next-line no-empty
  } catch (err) {}
  await client.close();
};

export const dropAllTestCollections = async (): Promise<void> => {
  await dropCollection(cardCollectionName);
  await dropCollection(quizCollectionName);
};

/**
 * Creates a quiz for Unit and Integration tests
 * @param quizName The name for the quiz
 * @param quizDescription The description of the quiz
 */
export const createQuiz = async (quizName: string, quizDescription: string): Promise<void> => {
  await addCard('testPrompt', 'testAnswer');
  const returnedCard = await getAllCards();
  const cardId = returnedCard.data[0]._id;
  await addQuiz(quizName, quizDescription, [cardId]);
};

/**
 * Adds cards for usage in the end to end tests
 */
export const createEndToEndCards = async (): Promise<void> => {
  await addCard('What is the latin name for the "Eastern Gray Squirrel"?', 'Sciurus carolinensis');
  await addCard('What is the latin name for the "Barn Owl"?', 'Tyto alba');
  await addCard('What is the latin name for the "Eurasian otter"?', 'Lutra lutra');
};

/**
 * Creates a quiz for usage in the end to end tests
 */
export const createEndToEndQuiz = async (): Promise<void> => {
  await addCard('What is the latin name for the "Eastern Gray Squirrel"?', 'Sciurus carolinensis');
  await addCard('What is the latin name for the "Barn Owl"?', 'Tyto alba');
  await addCard('What is the latin name for the "Eurasian otter"?', 'Lutra lutra');
  const returnedCards = await getAllCards();
  const cardIds = returnedCards.data.map((card) => card._id);
  await addQuiz('Latin animal names', 'All things Latin and furry!', cardIds);
};
