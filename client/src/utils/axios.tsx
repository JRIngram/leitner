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

const getAllCards = async () => await axios.get('getAllCards');

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
  console.log("adding");
  console.log(cardIds.toString());
  try{
    return await axios({
      method: 'post',
      url: 'addQuiz',
      data: {
        quizName,
        quizDescription,
        cardIds
      }
    })
  }
  catch(err){
    console.error(err);
  }

}

export { addCard, getAllCards, updateCard, deleteCard, addQuiz }