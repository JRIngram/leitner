import { NextFunction, Request, Response } from 'express';
import {
  getAllCards, deleteCard, addCard, updateCard,
} from './utils/mongo';

const express = require('express');
require('dotenv').config();

const { log } = console;
const app = express();
const port = process.env.SERVER_PORT;

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

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
  log(`Listening at http://localhost:${port}.`);
  log(`Ensure a MongoDB data is running @ ${process.env.DB_URL}:${process.env.DB_PORT} with the project '${process.env.DB_NAME}'`);
});
