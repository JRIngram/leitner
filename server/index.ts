import { NextFunction, Request, Response } from 'express';
import {
  getAllCards, getCardsByIds, deleteCard, addCard, updateCard,
  addQuiz, getAllQuizzes,
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

app.get('/', (req:Request, res: Response) => {
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
  log('retrieving all cards');
  res.send(queryResponse);
});

app.get('/getCardsByIds', async (req: Request, res: Response) => {
  const cardIds = <string[]> req.query.id;
  log(`retrieving cards with ids ${cardIds.toString}`);
  const queryResponse = await getCardsByIds(cardIds);
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
  quizName: string,
  quizDescription: string,
  cardIds: string[]
}

app.post('/addQuiz', async (req: Request<{}, {}, addQuizQuery, {}>, res: Response) => {
  const { quizName } = req.body;
  const { quizDescription } = req.body;
  const { cardIds } = req.body;
  const queryResponse = await addQuiz(quizName, quizDescription, cardIds);
  log(`adding quiz with ids ${cardIds}`);
  res.send(queryResponse);
});

app.get('/getAllQuizzes', async (req: Request, res: Response) => {
  const queryResponse = await getAllQuizzes();
  log('retrieving all quizzes');
  res.send(queryResponse);
});

app.listen(port, () => {
  log(`Listening at http://localhost:${port}.`);
  log(`Ensure a MongoDB data is running @ ${process.env.DB_URL}:${process.env.DB_PORT} with the project '${process.env.DB_NAME}'`);
});
