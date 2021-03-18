const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
require('dotenv').config();

const dbName = process.env.DB_NAME;
const dbUrl = process.env.DB_URL;
const tableName = 'cards';

const getCollectionObject = async (collectionName: string) => {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  return collection;
};

export const addCard = async (prompt: string, answer: string) => {
  const collection = await getCollectionObject(tableName);
  const data = { prompt, answer };
  await collection.insertOne(data);
  return `Added card with ${JSON.stringify(data)}`;
};

export const getAllCards = async () => {
  const collection = await getCollectionObject(tableName);
  const queryResults = await collection.find({}).toArray();
  return queryResults;
};

export const updateCard = async (cardId: string, prompt: string, answer: string) => {
  const collection = await getCollectionObject(tableName);
  const objectCardId = ObjectId(cardId);
  const updatedFields = {
    prompt,
    answer,
  };
  await collection.updateOne(
    { _id: objectCardId },
    { $set: updatedFields },
  );
  return `Card ${cardId} updated with ${JSON.stringify(updatedFields)}.`;
};

export const deleteCard = async (cardId: string) => {
  const IdToDelete = new ObjectId(cardId);
  const collection = await getCollectionObject(tableName);
  await collection.deleteOne({ _id: IdToDelete });
  return `Deleted card ${IdToDelete}.`;
};
