import { Card, CardIdsAndCorrectness, CardWithoutId, Quiz, QuizWithoutId } from '../../../types';
import axios, { AxiosResponse } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const host = process.env.REACT_APP_SERVER_HOST;
const port = process.env.REACT_APP_SERVER_PORT;
if(host && port){
  axios.defaults.baseURL = `http://${host}:${port}/`;
} else {
  // Default values if .env file not set correctly
  // This allows the jest tests to run
  // and should be patched in future.
  axios.defaults.baseURL = `http://localhost:3001/`;
}

const addCard = async (prompt: string, answer: string): Promise<AxiosResponse<CardWithoutId>> => {
  return await axios({
    method: 'post',
    url: 'addCard',
    data: {
      prompt,
      answer
    }
  });
}

const getAllCards = async (): Promise<AxiosResponse<Card[]>> => {
  return await axios.get<Card[]>('getAllCards');
};

const getCardsByIds = async (cardIds: string[]): Promise<AxiosResponse<Card[]>> => {
  let queryString = '';
  cardIds.forEach(cardId => {
    queryString = queryString + `id=${cardId}&`;
  });
  queryString = queryString.substr(0, queryString.length - 1);
  return await axios.get<Card[]>(`getCardsByIds?${queryString}`)
};

const updateCard = async (id: string, prompt: string, answer: string): Promise<AxiosResponse<Card[]>> => {
  return await axios({
    method: 'put',
    url: 'updateCard',
    data: {
      id,
      prompt,
      answer
    }
  });
}

const deleteCard = async (id: string): Promise<AxiosResponse<string>> => {
  return await axios({
    method: 'delete',
    url: 'deleteCard',
    data: {
      id,
    }
  });
}

const addQuiz = async (quizName: string, quizDescription: string, cardIds: string[]): Promise<AxiosResponse<QuizWithoutId>> => {
  return await axios({
    method: 'post',
    url: 'addQuiz',
    data: {
      quizName,
      quizDescription,
      cardIds
    }
  });
}

const getAllQuizzes = async (): Promise<AxiosResponse<Quiz[]>> => {
  return await axios.get<Quiz[]>('getAllQuizzes');
}

const updateQuiz = async (
  quizId: string, quizName: string, quizDescription: string, cardIds: string[],
): Promise<AxiosResponse<Quiz>> => {
  return await axios({
    method: 'put',
    url:'updateQuiz',
    data: {
      quizId,
      quizName,
      quizDescription,
      cardIds
    }
  })
}

const deleteQuiz = async (quizId: string): Promise<AxiosResponse<string>> => {
  return await axios({
    method: 'delete',
    url: 'deleteQuiz',
    data: {
      quizId
    }
  });
}

const updateQuizBoxes = async (quizId: string, cardIdsAndCorrectness: CardIdsAndCorrectness[]): Promise<AxiosResponse<{quizId: string, cardIdsAndCorrectness: CardIdsAndCorrectness}>> => {
  return await axios({
    method: 'put',
    url: 'updateQuizBoxes',
    data: {
      quizId,
      cardIdsAndCorrectness,
    }
  })
};

export { addCard, getAllCards, getCardsByIds, updateCard, deleteCard, addQuiz, getAllQuizzes, updateQuiz, deleteQuiz, updateQuizBoxes }