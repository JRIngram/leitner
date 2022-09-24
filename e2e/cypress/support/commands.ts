/// <reference types="cypress" />
import {
  addCardButton,
  addCardCheckBox,
  addCardsButton,
  ammendQuizzesButton,
  answerInput,
  confirmAddQuizButton,
  deleteCardButton,
  deleteQuizButton,
  manageNavButton,
  manageQuizzesButton,
  promptInput,
  quizDescriptionInput,
  quizNameInput,
  studyNavButton,
} from './selectors';
import {
  quizName,
  quizDescription,
  cardOnePromptText,
  cardOneAnswerText,
  cardTwoPromptText,
  cardTwoAnswerText,
  cardThreePromptText,
  cardThreeAnswerText,
} from './constants';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//     }
//   }
// }

export const addCard = (promptText: string, answerText: string) => {
  cy.get(manageNavButton).click();
  cy.get(addCardsButton).click();
  cy.get(promptInput).type(promptText);
  cy.get(answerInput).type(answerText);
  cy.get(addCardButton).click();
};

export const createEndToEndCards = () => {
  addCard(cardOnePromptText, cardOneAnswerText);
  addCard(cardTwoPromptText, cardTwoAnswerText);
  addCard(cardThreePromptText, cardThreeAnswerText);
};

export const deleteEndToEndCards = () => {
  cy.get(manageNavButton).click();
  cy.get(deleteCardButton).click();
  cy.get(deleteCardButton).click();
  cy.get(deleteCardButton).click();
};

export const deleteEndToEndQuiz = () => {
  cy.get(manageNavButton).click();
  cy.get(manageQuizzesButton).click();
  cy.get(ammendQuizzesButton).click();
  cy.get(deleteQuizButton).click();
  cy.get(studyNavButton).click();
};

export const createEndToEndQuiz = () => {
  cy.get(studyNavButton).click();
  cy.get(manageNavButton).click();
  cy.get(manageQuizzesButton).click();
  cy.get(quizNameInput).type(quizName);
  cy.get(quizDescriptionInput).type(quizDescription);
  cy.get(`${addCardCheckBox}0`).click();
  cy.get(`${addCardCheckBox}1`).click();
  cy.get(`${addCardCheckBox}2`).click();
  cy.get(confirmAddQuizButton).click();
};
