import { Card, Quiz } from '../../../types';
import axios from 'axios';

require('dotenv').config();

axios.defaults.baseURL = `http://localhost:3001/`;

const addCard = async (prompt: string, answer: string) => {
  return await axios({
    method: 'post',
    url: 'addCard',
    data: {
      prompt,
      answer
    }
  });
}

const getAllCards = async () => {
  return await axios.get<Card[]>('getAllCards');
};

const getCardsByIds = async (cardIds: string[]) => {
  let queryString = '';
  cardIds.forEach(cardId => {
    queryString = queryString + `id=${cardId}&`;
  });
  queryString = queryString.substr(0, queryString.length - 1);
  return await axios.get<Card[]>(`getCardsByIds?${queryString}`)
};

const updateCard = async (id: string, prompt: string, answer: string) => {
  return await axios({
    method: 'post',
    url: 'updateCard',
    data: {
      id,
      prompt,
      answer
    }
  });
}

const deleteCard = async (id: string) => {
  return await axios({
    method: 'post',
    url: 'deleteCard',
    data: {
      id,
    }
  });
}

const addQuiz = async (quizName: string, quizDescription: string, cardIds: string[]) => {
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

const getAllQuizzes = async () => {
  return await axios.get<Quiz[]>('getAllQuizzes');
}

const updateQuiz = async (
  quizId: string, quizName: string, quizDescription: string, cardIds: string[],
) => {
  return await axios({
    method: 'post',
    url:'updateQuiz',
    data: {
      quizId,
      quizName,
      quizDescription,
      cardIds
    }
  })
}

const deleteQuiz = async (quizId: string) => {
  return await axios({
    method: 'post',
    url: 'deleteQuiz',
    data: {
      quizId
    }
  });
}

export { addCard, getAllCards, getCardsByIds, updateCard, deleteCard, addQuiz, getAllQuizzes, updateQuiz, deleteQuiz}