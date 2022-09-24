import {
  addCardsButton,
  answerInput,
  cancelCardButton,
  deleteCardButton,
  editCardButton,
  greenEditCardButton,
  manageNavButton,
  noCardsCreatedMessage,
  promptInput,
  savedAnswer,
  savedPrompt,
} from '../support/selectors';
import { addCard } from '../support/commands';

describe('manage cards', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
  });

  it('can add and then delete a card', () => {
    const promptText = 'What is the latin name for the "Eastern Gray Squirrel"?';
    const answerText = 'Sciurus carolinensis';

    addCard(promptText, answerText);
    cy.get(savedPrompt).contains(promptText).should('be.visible');
    cy.get(savedAnswer).contains(answerText).should('be.visible');
    cy.get(deleteCardButton).click();
    cy.get(savedPrompt).should('not.exist');
    cy.get(savedAnswer).should('not.exist');
    cy.get(noCardsCreatedMessage).contains('No cards have been created.').should('be.visible');
  });

  it('can cancel adding a card', () => {
    cy.get(manageNavButton).click();
    cy.get(addCardsButton).click();
    cy.get(promptInput).type('What is the latin name for the "Barn Owl"?');
    cy.get(answerInput).type('Tyto alba');
    cy.get(cancelCardButton).click();
    cy.get(savedPrompt).should('not.exist');
    cy.get(savedAnswer).should('not.exist');
    cy.get(noCardsCreatedMessage).contains('No cards have been created.').should('be.visible');
  });

  it('can create, update and delete a card', () => {
    const promptText = 'Prompt: What is the latin name for the "Tawny Owl"?';
    const answerText = 'Sciurus carolinensis';

    addCard(promptText, answerText);
    cy.get(editCardButton).click();
    cy.get(promptInput).clear();
    cy.get(promptInput).type(promptText);
    cy.get(answerInput).clear();
    cy.get(answerInput).type(answerText);
    cy.get(greenEditCardButton).click();
    cy.get(savedPrompt).contains(promptText).should('be.visible');
    cy.get(savedAnswer).contains(answerText).should('be.visible');
    cy.get(deleteCardButton).click();
    cy.get(savedPrompt).should('not.exist');
    cy.get(savedAnswer).should('not.exist');
    cy.get(noCardsCreatedMessage).contains('No cards have been created.').should('be.visible');
  });
});
