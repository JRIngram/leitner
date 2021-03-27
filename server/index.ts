import { NextFunction, Request, Response } from 'express';
import {
  getAllCards, deleteCard, addCard, updateCard,
  addQuiz,
} from './utils/mongo';

const express = require('express');
require('dotenv').config();

const { log } = console;
const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (res: Response) => {
  res.send('Hello World!');
});

app.post('/addCard', async (req: Request, res: Response) => {
  const prompt = <string> req.body.prompt;
  const answer = <string> req.body.answer;
  const queryResponse = await addCard(prompt, answer);
  res.send(queryResponse);
});

app.get('/getAllCards', async (req: Request, res: Response) => {
  const queryResponse = await getAllCards();
  res.send(queryResponse);
});

app.post('/updateCard', async (req: Request, res: Response) => {
  const cardId = <string> req.body.id;
  const updatedPrompt = <string> req.body.prompt;
  const updatedAnswer = <string> req.body.answer;
  const queryResponse = await updateCard(cardId, updatedPrompt, updatedAnswer);
  log(`updating ${cardId}`);
  res.send(queryResponse);
});

app.post('/deleteCard', async (req: Request, res: Response) => {
  const cardId = <string> req.body.id;
  const queryResponse = await deleteCard(cardId);
  log(`delete card ${cardId}`);
  res.send(queryResponse);
});

type addQuizQuery = {
  name: string,
  description: string,
  cardIds: string[]
}

app.get('/addQuiz', async (req: Request<{}, {}, {}, addQuizQuery>, res: Response) => {
  const { name } = req.query;
  const { description } = req.query;
  const { cardIds } = req.query;
  console.log(await addQuiz(name, description, cardIds));
  res.send(cardIds);
});

app.listen(port, () => {
  log(`Listening at http://localhost:${port}.`);
  log(`Ensure a MongoDB data is running @ ${process.env.DB_URL}:${process.env.DB_PORT} with the project '${process.env.DB_NAME}'`);
});
