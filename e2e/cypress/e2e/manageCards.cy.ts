import { addCard } from '../support/commands';
import {
  cardOnePromptText,
  cardOneAnswerText,
  cardTwoPromptText,
  cardTwoAnswerText,
  updatedCardTwoPromptText,
  updatedCardTwoAnswerText,
} from '../support/constants';
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

describe('manage cards', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
  });

  it('can add and then delete a card', () => {
    addCard(cardOnePromptText, cardOneAnswerText);
    cy.get(savedPrompt).contains(cardOnePromptText).should('be.visible');
    cy.get(savedAnswer).contains(cardOneAnswerText).should('be.visible');
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
    addCard(cardTwoPromptText, cardTwoAnswerText);
    cy.get(editCardButton).click();
    cy.get(promptInput).clear();
    cy.get(promptInput).type(updatedCardTwoPromptText);
    cy.get(answerInput).clear();
    cy.get(answerInput).type(updatedCardTwoAnswerText);
    cy.get(greenEditCardButton).click();
    cy.get(savedPrompt).contains(updatedCardTwoPromptText).should('be.visible');
    cy.get(savedAnswer).contains(updatedCardTwoAnswerText).should('be.visible');
    cy.get(deleteCardButton).click();
    cy.get(savedPrompt).should('not.exist');
    cy.get(savedAnswer).should('not.exist');
    cy.get(noCardsCreatedMessage).contains('No cards have been created.').should('be.visible');
  });
});
