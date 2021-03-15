require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const app = express();
const port = 3000;
const dbUrl = process.env.DB_URL;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const tableName = 'cards';

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/addCard', (req,res) => {
  const prompt = req.query.prompt;
  const answer = req.query.answer;
  MongoClient.connect(dbUrl, (err, client) => {
    const data = {
      prompt: prompt,
      answer: answer
    };
    const db = client.db(dbName);
    const collection = db.collection(tableName);
    collection.insertOne(data, () =>{
      console.log(`inserted ${JSON.stringify(data)} into ${dbName}`);
      res.send(`inserted ${JSON.stringify(data)} into ${dbName}`);
    });
    client.close();
  });
});


app.get('/getAllCards', async (req, res) => {
  let queryResult;
  MongoClient.connect(dbUrl, (err, client) => {
    const db = client.db(dbName);
    const collection = db.collection(tableName);
    collection.find({}).toArray((err, results) =>{
      res.json(results);
    });
    client.close();
  });
});

app.get('/updateCard', async (req, res) => {
  const cardId = new ObjectId(req.query.id);
  const updatedPrompt = req.query.prompt;
  const updatedAnswer = req.query.answer;

  MongoClient.connect(dbUrl, (err, client) => {
    const db = client.db(dbName);
    const collection = db.collection(tableName);
    const data = {
      prompt: updatedPrompt,
      answer: updatedAnswer
    }
    collection.updateOne(
      { _id : cardId }, 
      { $set: data }, 
      () => {
        res.send(`Updated the card with id ${cardId} to equal ${JSON.stringify(data)}.`);
      }
    );
  });
});

app.get('/deleteCard', async (req, res) => {
  const cardId = new ObjectId(req.query.id);

  MongoClient.connect(dbUrl, (err, client) => {
    console.log('Retrieve all from mongodb');
    const db = client.db(dbName);
    const collection = db.collection(tableName);
    collection.deleteOne(
      { _id : cardId }, 
      () => {
        res.send(`Deleted card ${cardId}.`);
      }
    );
  });
});

app.listen(port, () => {
  const DB_PORT = process.env.DB_PORT;
  const DB_URL = process.env.DB_URL;
  const DB_NAME = process.env.DB_NAME;
  console.log(`Example app listening at http://localhost:${port}.`)
  console.log(`Ensure a MongoDB data is running @ ${process.env.DB_URL}:${process.env.DB_PORT} with the project '${process.env.DB_NAME}'`);
})