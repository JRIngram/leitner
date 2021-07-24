// eslint-disable-next-line import/no-extraneous-dependencies
import { Selector } from 'testcafe';
import { dropAllTestCollections } from '../testUtils/testUtils';
import url from './constants';

const selectors = {
  manageNavButton: Selector('p').withText('Manage'),
  addCardsButton: Selector('#coloured-button-add-cards'),
  addCardButton: Selector('#coloured-button-add-card'),
  promptInput: Selector('#prompt'),
  answerInput: Selector('#answer'),
  manageQuizzesButton: Selector('#coloured-button-manage-quizzes'),
  quizNameInput: Selector('#quizName'),
  quizDescriptionInput: Selector('#quizDescription'),
  addQuizButton: Selector('#coloured-button-confirm-add-quiz'),
  confirmEditQuizButton: Selector('#coloured-button-confirm-edit-quiz'),
  cardOnePrompt: Selector('li').withText('What is the latin name for the "Eastern Gray Squirrel"?'),
  cardTwoPrompt: Selector('li').withText('What is the latin name for the "Barn Owl"?'),
};

// @ts-ignore
const addQuiz = async (t) => {
  const {
    manageNavButton, addCardButton, addCardsButton,
    promptInput, answerInput, manageQuizzesButton,
    quizNameInput, quizDescriptionInput, addQuizButton,
  } = selectors;
  await t
    .click(manageNavButton)
    .click(addCardsButton)
    .typeText(promptInput, 'What is the latin name for the "Eastern Gray Squirrel"?')
    .typeText(answerInput, 'Sciurus carolinensis')
    .click(addCardButton)
    .click(addCardsButton)
    .typeText(promptInput, 'What is the latin name for the "Barn Owl"?')
    .typeText(answerInput, 'Tyto alba')
    .click(addCardButton)
    .click(addCardsButton)
    .typeText(promptInput, 'What is the latin name for the "Eurasian otter"?')
    .typeText(answerInput, 'Lutra lutra')
    .click(addCardButton)
    .click(manageQuizzesButton)
    .typeText(quizNameInput, 'Latin animal names')
    .typeText(quizDescriptionInput, 'All things Latin and furry!')
    .click(Selector('#add-card-checkbox-0'))
    .click(Selector('#add-card-checkbox-1'))
    .click(Selector('#add-card-checkbox-2'))
    .click(addQuizButton)
};

fixture`studying`
  .page`${url}`
  .before(async () => {
    await dropAllTestCollections();
  });

test
  .before(async (t) => {
    await addQuiz(t);
  })('can study a quiz', async (t) => {
    console.log("hi there")
  });