import { MongoClient, ObjectId } from 'mongodb';

require('dotenv').config();

const dbName = typeof process.env.DB_NAME !== 'undefined' ? process.env.DB_NAME : '';
const dbUrl = typeof process.env.DB_URL !== 'undefined' ? process.env.DB_URL : '';
const cardCollection = process.env.TEST_ENV === 'true' ? 'testCards' : 'cards';
const quizCollection = process.env.TEST_ENV === 'true' ? 'testQuizzes' : 'quizzes';

if (dbName === '' && dbUrl === '') {
  throw Error('process.env.DB_NAME or process.env.DB_URL is undefined');
}

export const addCard = async (prompt: string, answer: string) => {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  const collection = db.collection(cardCollection);
  const data = { prompt, answer };
  await collection.insertOne(data);
  await client.close();
  return `Added card with prompt:${prompt} & answer:${answer}`;
};

export const getAllCards = async () => {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  const collection = db.collection(cardCollection);
  const queryResults = await collection.find({}).toArray();
  await client.close();
  return queryResults;
};

export const getCardsByIds = async (ids: string[]) => {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  const collection = db.collection(cardCollection);
  const objectIds = ids.map((id) => new ObjectId(id));
  const queryResults = await collection.find({ _id: { $in: objectIds } }).toArray();
  await client.close();
  return queryResults;
};

export const updateCard = async (cardId: string, prompt: string, answer: string) => {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  const collection = db.collection(cardCollection);
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
  const collection = db.collection(cardCollection);
  const idToDelete = new ObjectId(cardId);
  await collection.deleteOne({ _id: idToDelete });
  await client.close();
  return `Deleted card ${idToDelete}.`;
};

export const addQuiz = async (quizName: string, quizDescription: string, cardIds: string[]) => {
  try {
    const client = await MongoClient.connect(dbUrl);
    const db = client.db(dbName);
    const collection = db.collection(quizCollection);
    const cardObjectIds = cardIds.map((cardId) => new ObjectId(cardId));
    const quizData = {
      name: quizName,
      description: quizDescription,
      cardObjectIds,
    };
    await collection.insertOne(quizData);
    await client.close();
    return `Created quiz with ${quizName}, ${quizDescription}, ${cardObjectIds}`;
  } catch (err) {
    return `${err}`;
  }
};

export const getAllQuizzes = async () => {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  const collection = db.collection(quizCollection);
  const queryResults = await collection.find({}).toArray();
  await client.close();
  return queryResults;
};

export const deleteQuiz = async (quizId: string) => {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  const collection = db.collection(quizCollection);
  const idToDelete = new ObjectId(quizId);
  await collection.deleteOne({ _id: idToDelete });
  await client.close();
  return `Deleted card ${quizId}.`;
}