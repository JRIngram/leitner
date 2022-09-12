/// <reference types="cypress" />
import { selectors } from '../support/selectors'


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
  cy.get(selectors.manageNavButton).click();
  cy.get(selectors.addCardsButton).click();
  cy.get(selectors.promptInput).type(promptText);
  cy.get(selectors.answerInput).type(answerText);
  cy.get(selectors.addCardButton).click();
};

export const createEndToEndCards = () => {
  addCard('What is the latin name for the "Eastern Gray Squirrel"?', 'Sciurus carolinensis');
  addCard('What is the latin name for the "Barn Owl"?', 'Tyto alba');
  addCard('What is the latin name for the "Eurasian otter"?', 'Lutra lutra');
};
