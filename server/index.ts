import { Request, Response } from 'express';
import { createRequire } from 'module';
import { getAllCards, deleteCard, addCard, updateCard } from './utils/mongo.js';
const require = createRequire(import.meta.url);
const express = require('express');
require('dotenv').config();

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/addCard', async (req: Request, res: Response) => {
  const prompt = <string> req.query.prompt;
  const answer = <string> req.query.answer;
  const queryResponse = await addCard(prompt, answer);
  res.send(queryResponse);
});


app.get('/getAllCards', async (req: Request, res: Response) => {
  const queryResponse = await getAllCards();
  res.send(queryResponse);
});

app.get('/updateCard', async (req: Request, res: Response) => {
  const cardId = <string> req.query.id;
  const updatedPrompt = <string> req.query.prompt;
  const updatedAnswer = <string> req.query.answer;
  const queryResponse = await updateCard(cardId, updatedPrompt, updatedAnswer);
  res.send(queryResponse);
});

app.get('/deleteCard', async (req: Request, res: Response) => {
  const cardId = <string> req.query.id;
  const queryResponse = await deleteCard(cardId);
  res.send(queryResponse);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}.`)
  console.log(`Ensure a MongoDB data is running @ ${process.env.DB_URL}:${process.env.DB_PORT} with the project '${process.env.DB_NAME}'`);
})