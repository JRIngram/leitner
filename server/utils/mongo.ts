import { MongoClient, ObjectId } from 'mongodb';

require('dotenv').config();

const dbName = typeof process.env.DB_NAME !== 'undefined' ? process.env.DB_NAME : '';
const dbUrl = typeof process.env.DB_URL !== 'undefined' ? process.env.DB_URL : '';
const tableName = process.env.TEST_ENV === 'true' ? 'test' : 'cards';

if (dbName === '' && dbUrl === '') {
  throw Error('process.env.DB_NAME or process.env.DB_URL is undefined');
}

export const addCard = async (prompt: string, answer: string) => {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  const collection = db.collection(tableName);
  const data = { prompt, answer };
  await collection.insertOne(data);
  await client.close();
  return `Added card with prompt:${prompt} & answer:${answer}`;
};

export const getAllCards = async () => {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  const collection = db.collection(tableName);
  const queryResults = await collection.find({}).toArray();
  await client.close();
  return queryResults;
};

export const updateCard = async (cardId: string, prompt: string, answer: string) => {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  const collection = db.collection(tableName);
  const objectCardId = new ObjectId(cardId);
  const updatedFields = {
    prompt,
    answer,
  };
  await collection.updateOne(
    { _id: objectCardId },
    { $set: updatedFields },
  );
  await client.close();
  return `Card ${cardId} updated with ${JSON.stringify(updatedFields)}.`;
};

export const deleteCard = async (cardId: string) => {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  const collection = db.collection(tableName);
  const IdToDelete = new ObjectId(cardId);
  await collection.deleteOne({ _id: IdToDelete });
  await client.close();
  return `Deleted card ${IdToDelete}.`;
};
