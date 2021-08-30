// eslint-disable-next-line import/no-extraneous-dependencies
import { Selector } from 'testcafe';

require('dotenv').config();

export const url = `${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`;

export const selectors = {
  // nav buttons
  manageNavButton: Selector('p').withText('Manage'),
  studyNavButton: Selector('p').withText('Study'),
  manageQuizzesButton: Selector('#coloured-button-manage-quizzes'),

  // Card management
  addCardsButton: Selector('#coloured-button-add-cards'),
  addCardButton: Selector('#coloured-button-add-card'),
  deleteCardButton: Selector('#coloured-button-delete'),
  promptInput: Selector('#prompt'),
  answerInput: Selector('#answer'),

  // Quiz management
  quizNameInput: Selector('#quizName'),
  quizDescriptionInput: Selector('#quizDescription'),
  quizMustContainCards: Selector('p').withText('A quiz must contain at least one card'),
  addQuizButton: Selector('#coloured-button-confirm-add-quiz'),
  editQuizButton: Selector('#coloured-button-edit-quiz'),
  confirmEditQuizButton: Selector('#coloured-button-confirm-edit-quiz'),
  quizAddedText: Selector('p').withText('Quiz successfully added.'),
  amendQuizzesButton: Selector('#coloured-button-amend-quizzes'),
  deleteQuizButton: Selector('#coloured-button-delete-quiz'),

  // Study Homepage
  noQuizzesCreatedText: Selector('p').withText('No quizzes have been created. Please create quizzes in the Manage tab.'),
  quizBoxDropdown: Selector('#quizBoxes'),
  quizBoxDropdownOne: Selector('#quizBoxes-1'),
  quizBoxDropdownTwo: Selector('#quizBoxes-2'),
  quizBoxDropdownThree: Selector('#quizBoxes-3'),

  // Studying
  cardOnePrompt: Selector('li').withText('What is the latin name for the "Eastern Gray Squirrel"?'),
  cardTwoPrompt: Selector('li').withText('What is the latin name for the "Barn Owl"?'),
  quizTitle: Selector('h1').withText('Latin animal names'),
  quizReviewHeader: Selector('h2').withText('Quiz Review'),
  startQuizButton: Selector('#coloured-button-start-quiz'),
  quizAnswerInput: Selector('#answer-input'),
  quizPrompt: Selector('#quizPrompt'),
  submitAnswer: Selector('#coloured-button-submit-answer'),
  correctAnswerButton: Selector('#coloured-button-correct'),
  incorrectAnswerButton: Selector('#coloured-button-incorrect'),
  quizScore: Selector('h3').withText('2 correct out of 3 - 66.67%'),
  finishQuizButton: Selector('#coloured-button-finish-review'),

};
