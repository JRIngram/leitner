import { MongoClient } from 'mongodb';

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

export const dropAllTestCollections = async () => {
  await dropCollection(cardCollectionName);
  await dropCollection(quizCollectionName);
};

export default dropAllTestCollections;
