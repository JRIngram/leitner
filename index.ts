import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { getAllCards, deleteCard, addCard, updateCard } from './utils/mongo.js';
const express = require('express');
require('dotenv').config();

const app = express();
const port = 3000;
const dbUrl = process.env.DB_URL;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const tableName = 'cards';

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/addCard', async (req,res) => {
  const prompt = req.query.prompt;
  const answer = req.query.answer;
  const queryResponse = await addCard(prompt, answer);
  res.send(queryResponse);
});


app.get('/getAllCards', async (req, res) => {
  const queryResponse = await getAllCards();
  res.send(queryResponse);
});

app.get('/updateCard', async (req, res) => {
  const cardId = req.query.id;
  const updatedPrompt = req.query.prompt;
  const updatedAnswer = req.query.answer;
  const queryResponse = await updateCard(cardId, updatedPrompt, updatedAnswer);
  res.send(queryResponse);
});

app.get('/deleteCard', async (req, res) => {
  const cardId = req.query.id;
  const queryResponse = await deleteCard(cardId);
  res.send(queryResponse);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}.`)
  console.log(`Ensure a MongoDB data is running @ ${process.env.DB_URL}:${process.env.DB_PORT} with the project '${process.env.DB_NAME}'`);
})