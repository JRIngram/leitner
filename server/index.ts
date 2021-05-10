import { NextFunction, Request, Response } from 'express';
import {
  getAllCards, getCardsByIds, deleteCard, addCard, updateCard,
  addQuiz, getAllQuizzes, updateQuiz, deleteQuiz,
} from './utils/mongo';

const express = require('express');
require('dotenv').config();

const { log, error } = console;
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
  res.send('Leitner DB');
});

app.post('/addCard', async (req: Request, res: Response) => {
  try {
    const prompt = <string> req.body.prompt;
    const answer = <string> req.body.answer;
    const queryResponse = await addCard(prompt, answer);
    res.send(queryResponse);
  } catch {
    res.sendStatus(500);
  }
});

app.get('/getAllCards', async (req: Request, res: Response) => {
  try {
    const queryResponse = await getAllCards();
    log('retrieving all cards');
    res.send(queryResponse);
  } catch {
    res.sendStatus(500);
  }
});

app.get('/getCardsByIds', async (req: Request, res: Response) => {
  try {
    const cardIds = <string[]> (Array.isArray(req.query.id) ? req.query.id : [req.query.id]);
    log(`retrieving cards with ids ${cardIds.toString()}`);
    const queryResponse = await getCardsByIds(cardIds);
    res.send(queryResponse);
  } catch (err) {
    error(err);
    res.sendStatus(500);
  }
});

app.post('/updateCard', async (req: Request, res: Response) => {
  try {
    const cardId = <string> req.body.id;
    const updatedPrompt = <string> req.body.prompt;
    const updatedAnswer = <string> req.body.answer;
    const queryResponse = await updateCard(cardId, updatedPrompt, updatedAnswer);
    log(`updating ${cardId}`);
    res.send(queryResponse);
  } catch {
    res.sendStatus(500);
  }
});

app.post('/deleteCard', async (req: Request, res: Response) => {
  try {
    const cardId = <string> req.body.id;
    const queryResponse = await deleteCard(cardId);
    log(`delete card ${cardId}`);
    res.send(queryResponse);
  } catch {
    res.sendStatus(500);
  }
});

type addQuizQuery = {
  quizName: string,
  quizDescription: string,
  cardIds: string[]
}

app.post('/addQuiz', async (req: Request<{}, {}, addQuizQuery, {}>, res: Response) => {
  try {
    const { quizName } = req.body;
    const { quizDescription } = req.body;
    const { cardIds } = req.body;
    const queryResponse = await addQuiz(quizName, quizDescription, cardIds);
    log(`adding quiz with ids ${cardIds}`);
    res.send(queryResponse);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get('/getAllQuizzes', async (req: Request, res: Response) => {
  try {
    const queryResponse = await getAllQuizzes();
    log('retrieving all quizzes');
    res.send(queryResponse);
  } catch (err) {
    res.sendStatus(500);
  }
});

type updateQuizQuery = {
  quizId: string,
  quizName: string,
  quizDescription: string,
  cardIds: string[]
}

app.post('/updateQuiz', async (req: Request<{}, {}, updateQuizQuery, {}>, res: Response) => {
  try {
    const { quizId } = req.body;
    const { quizName } = req.body;
    const { quizDescription } = req.body;
    const { cardIds } = req.body;
    const queryResponse = await updateQuiz(quizId, quizName, quizDescription, cardIds);
    log(`updating quiz ${quizId} with ids ${cardIds}`);
    res.send(queryResponse);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.post('/deleteQuiz', async (req: Request, res: Response) => {
  try {
    const { quizId } = req.body;
    const queryResponse = await deleteQuiz(quizId);
    log(`delete quiz ${quizId}`);
    res.send(queryResponse);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  log(`Listening at http://localhost:${port}.`);
  log(`Ensure a MongoDB data is running @ ${process.env.DB_URL}:${process.env.DB_PORT} with the project '${process.env.DB_NAME}'`);
});
