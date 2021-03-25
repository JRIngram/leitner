import axios from 'axios';
require('dotenv').config();
axios.defaults.baseURL = `http://localhost:3001/`;

const addCard = async (prompt: string, answer: string) => {
  await axios({
    method: 'post',
    url: 'addCard',
    data: {
      prompt,
      answer
    }
  });
}

const getAllCards = async () => axios.get('getAllCards');

const updateCard = async (id: string, prompt: string, answer: string) => {
  await axios({
    method: 'post',
    url: 'updateCard',
    data: {
      id,
      prompt,
      answer
    }
  });
}

const deleteCard = (id: string) => {
  axios.get(`deleteCard?id=${id}`)
}

export { addCard, getAllCards, updateCard, deleteCard }