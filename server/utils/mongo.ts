import { MongoClient, ObjectId } from 'mongodb';
import { CardIdsAndCorrectness, CardInQuiz } from '../types';

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

export const getCardsByIds = async (ids: ObjectId[]) => {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  const collection = db.collection(cardCollection);
  const objectIds = ids.map((id) => new ObjectId(id));
  const queryResults = await collection.find({ _id: { $in: objectIds } }).toArray();
  await client.close();
  return queryResults;
};

export const updateCard = async (cardId: ObjectId, prompt: string, answer: string) => {
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

export const deleteCard = async (cardId: ObjectId) => {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  const collection = db.collection(cardCollection);
  const idToDelete = new ObjectId(cardId);
  await collection.deleteOne({ _id: idToDelete });
  await client.close();
  return `Deleted card ${idToDelete}.`;
};

export const addQuiz = async (quizName: string, quizDescription: string, cardIds: ObjectId[]) => {
  try {
    const client = await MongoClient.connect(dbUrl);
    const db = client.db(dbName);
    const collection = db.collection(quizCollection);

    const cardObjects: CardInQuiz[] = cardIds.map((cardId) => {
      const objectId = new ObjectId(cardId);
      const cardInQuiz: CardInQuiz = {
        _id: objectId.toHexString(),
        box: 1,
      };
      return cardInQuiz;
    });

    const quizData = {
      name: quizName,
      description: quizDescription,
      cardObjects,
    };

    await collection.insertOne(quizData);
    await client.close();
    return `Created quiz with ${quizName}, ${quizDescription}, ${[...cardIds]}`;
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

export const updateQuiz = async (
  quizId: ObjectId, quizName: string, quizDescription: string, cardIds: string[],
) => {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  const collection = db.collection(quizCollection);

  const _id = new ObjectId(quizId);
  const cardObjects = cardIds.map((cardId) => {
    const cardObject = {
      _id: new ObjectId(cardId),
      box: 1,
    };
    return cardObject;
  });

  const updatedFields = {
    _id,
    name: quizName,
    description: quizDescription,
    cardObjects,
  };
  await collection.updateOne(
    { _id },
    { $set: updatedFields },
  );
  await client.close();
  return `Quiz ${quizId} updated with ${JSON.stringify(updatedFields)}.`;
};

export const deleteQuiz = async (quizId: ObjectId) => {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  const collection = db.collection(quizCollection);
  const idToDelete = new ObjectId(quizId);
  await collection.deleteOne({ _id: idToDelete });
  await client.close();
  return `Deleted card ${quizId}.`;
};

export const updateQuizBoxes = async (
  quizId: string,
  cardIdsAndCorrectness: CardIdsAndCorrectness[],
) => {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  const collection = db.collection(quizCollection);
  const quizArray = await collection.find({ _id: new ObjectId(quizId) }).toArray();
  const quizToUpdate = quizArray[0];
  const quizCardObjects = quizToUpdate.cardObjects;

  const calculateBoxValue = (currentBoxValue: number, correct: boolean) => {
    let boxModifier = 0;
    if (currentBoxValue < 3 && correct) {
      boxModifier = 1;
    } else if (currentBoxValue > 1 && !correct) {
      boxModifier = -1;
    }
    return boxModifier;
  };

  const updatedQuizCardObjects = quizCardObjects.map((cardObject: any) => {
    const cardIdAndCorrectness = cardIdsAndCorrectness.find((card: CardIdsAndCorrectness) => {
      const { _id } = card;
      return _id === cardObject._id.toString();
    });
    if (cardIdAndCorrectness) {
      const newBoxValue = calculateBoxValue(cardObject.box, cardIdAndCorrectness.correct);
      const updatedCardObject = {
        _id: cardObject._id,
        box: cardObject.box + newBoxValue,
      };
      return updatedCardObject;
    }
    return cardObject;
  });

  const { _id, name, description } = quizToUpdate;
  const updatedQuiz = {
    name,
    description,
    cardObjects: updatedQuizCardObjects,
  };

  await collection.updateOne(
    { _id },
    { $set: updatedQuiz },
  );
  await client.close();

  return `Updated cards in ${_id}`;
};
