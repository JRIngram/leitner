import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const dbName = process.env.DB_NAME;
const dbUrl = process.env.DB_URL;
const tableName = 'cards';

const getCollectionObject = async (collectionName) => {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  return collection;
}

export const addCard = async (prompt, answer) => {
  const collection = await getCollectionObject(tableName);
  const data = { prompt, answer }
  await collection.insertOne(data);
  return `Added card with ${JSON.stringify(data)}`;
}

export const getAllCards = async () => {
  const collection = await getCollectionObject(tableName);
  const queryResults = await collection.find({}).toArray();
  return queryResults;
}

export const updateCard = async (cardId, prompt, answer) => {
  const collection = await getCollectionObject(tableName);
  const objectCardId = ObjectId(cardId);
  const updatedFields = {
    prompt,
    answer
  }
  await collection.updateOne(
    { _id: objectCardId },
    { $set: updatedFields }
  );
  return `Card ${cardId} updated with ${JSON.stringify(updatedFields)}.`;
}

export const deleteCard = async (cardId) => {
  const IdToDelete = new ObjectId(cardId);
  const collection = await getCollectionObject(tableName);
  await collection.deleteOne({ _id : IdToDelete });
  return `Deleted card ${IdToDelete}.`;
}