import { NextFunction, Request, Response } from 'express';
import { CardIdsAndCorrectness } from '../types';
import {
  getAllCards, getCardsByIds, deleteCard, addCard, updateCard,
  addQuiz, getAllQuizzes, updateQuiz, deleteQuiz, updateQuizBoxes,
} from './utils/mongo';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const { log, error } = console;
const app = express();
const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  const date = new Date();
  const fullTime = date.toUTCString();
  log(`{${fullTime}} - ${req.method} - ${req.originalUrl}`);
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.get('/', (req:Request, res: Response) => {
  res.send('Leitner DB');
});

app.post('/addCard', async (req: Request, res: Response) => {
  try {
    const prompt = <string> req.body.prompt;
    const answer = <string> req.body.answer;
    const queryResponse = await addCard(prompt, answer);
    res.send(queryResponse);
  } catch (err) {
    error(err);
    res.sendStatus(500);
  }
});

app.get('/getAllCards', async (req: Request, res: Response) => {
  try {
    const queryResponse = await getAllCards();
    res.send(queryResponse);
  } catch (err) {
    error(err);
    res.sendStatus(500);
  }
});

app.get('/getCardsByIds', async (req: Request, res: Response) => {
  try {
    const cardIds = <string[]> (Array.isArray(req.query.id) ? req.query.id : [req.query.id]);
    const queryResponse = await getCardsByIds(cardIds);
    res.send(queryResponse);
  } catch (err) {
    error(err);
    res.sendStatus(500);
  }
});

app.put('/updateCard', async (req: Request, res: Response) => {
  try {
    const cardId = <string> req.body.id;
    const updatedPrompt = <string> req.body.prompt;
    const updatedAnswer = <string> req.body.answer;
    const queryResponse = await updateCard(cardId, updatedPrompt, updatedAnswer);
    res.send(queryResponse);
  } catch (err) {
    error(err);
    res.sendStatus(500);
  }
});

app.delete('/deleteCard', async (req: Request, res: Response) => {
  try {
    const cardId = <string> req.body.id;
    const queryResponse = await deleteCard(cardId);
    res.send(queryResponse);
  } catch (err) {
    error(err);
    res.sendStatus(500);
  }
});

type addQuizQuery = {
  quizName: string,
  quizDescription: string,
  cardIds: string[]
}

app.post('/addQuiz', async (req: Request<unknown, unknown, addQuizQuery, unknown>, res: Response) => {
  try {
    const { quizName } = req.body;
    const { quizDescription } = req.body;
    const { cardIds } = req.body;
    const queryResponse = await addQuiz(quizName, quizDescription, cardIds);
    res.send(queryResponse);
  } catch (err) {
    error(err);
    res.sendStatus(500);
  }
});

app.get('/getAllQuizzes', async (req: Request, res: Response) => {
  try {
    const queryResponse = await getAllQuizzes();
    res.send(queryResponse);
  } catch (err) {
    error(err);
    res.sendStatus(500);
  }
});

type updateQuizQuery = {
  quizId: string,
  quizName: string,
  quizDescription: string,
  cardIds: string[]
}

app.put('/updateQuiz', async (req: Request<unknown, unknown, updateQuizQuery, unknown>, res: Response) => {
  try {
    const { quizId } = req.body;
    const { quizName } = req.body;
    const { quizDescription } = req.body;
    const { cardIds } = req.body;
    const queryResponse = await updateQuiz(quizId, quizName, quizDescription, cardIds);
    res.send(queryResponse);
  } catch (err) {
    error(err);
    res.sendStatus(500);
  }
});

app.delete('/deleteQuiz', async (req: Request, res: Response) => {
  try {
    const { quizId } = req.body;
    const queryResponse = await deleteQuiz(quizId);
    res.send(queryResponse);
  } catch (err) {
    error(err);
    res.sendStatus(500);
  }
});

type updateQuizBoxesQuery = {
  quizId: string,
  cardIdsAndCorrectness: CardIdsAndCorrectness[];
}

app.put('/updateQuizBoxes', async (req: Request<unknown, unknown, updateQuizBoxesQuery, unknown>, res: Response) => {
  try {
    const { quizId, cardIdsAndCorrectness } = req.body;
    const queryResponse = await updateQuizBoxes(quizId, cardIdsAndCorrectness);
    res.send(queryResponse);
  } catch (err) {
    error(err);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  log(`Listening at http://${host}:${port}.`);
  log(`Ensure a MongoDB data is running @ ${process.env.DB_URL}:${process.env.DB_PORT} with the project '${process.env.DB_NAME}'`);
});
