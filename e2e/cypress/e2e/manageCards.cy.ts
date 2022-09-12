import { selectors } from '../support/selectors';
import { addCard } from '../support/commands'

describe('manage cards', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
  });

  it('can add and then delete a card', () => {
    const promptText = 'What is the latin name for the "Eastern Gray Squirrel"?';
    const answerText = 'Sciurus carolinensis';

    addCard(promptText, answerText);
    cy.get(selectors.savedPrompt).contains(promptText).should('be.visible');
    cy.get(selectors.savedAnswer).contains(answerText).should('be.visible');
    cy.get(selectors.deleteCardButton).click();
    cy.get(selectors.savedPrompt).should('not.exist');
    cy.get(selectors.savedAnswer).should('not.exist');
    cy.get(selectors.noCardsCreatedMessage).contains('No cards have been created.').should('be.visible');
  });

  it('can cancel adding a card', () => {
    cy.get(selectors.manageNavButton).click();
    cy.get(selectors.addCardsButton).click();
    cy.get(selectors.promptInput).type('What is the latin name for the "Barn Owl"?');
    cy.get(selectors.answerInput).type('Tyto alba');
    cy.get(selectors.cancelCardButton).click();
    cy.get(selectors.savedPrompt).should('not.exist');
    cy.get(selectors.savedAnswer).should('not.exist');
    cy.get(selectors.noCardsCreatedMessage).contains('No cards have been created.').should('be.visible');
  });

  it('can create, update and delete a card', () => {
    const promptText = 'Prompt: What is the latin name for the "Tawny Owl"?';
    const answerText = 'Sciurus carolinensis';

    addCard(promptText, answerText);
    cy.get(selectors.editCardButton).click();
    cy.get(selectors.promptInput).clear();
    cy.get(selectors.promptInput).type(promptText);
    cy.get(selectors.answerInput).clear();
    cy.get(selectors.answerInput).type(answerText);
    cy.get(selectors.greenEditCardButton).click();
    cy.get(selectors.savedPrompt).contains(promptText).should('be.visible');
    cy.get(selectors.savedAnswer).contains(answerText).should('be.visible');
    cy.get(selectors.deleteCardButton).click();
    cy.get(selectors.savedPrompt).should('not.exist');
    cy.get(selectors.savedAnswer).should('not.exist');
    cy.get(selectors.noCardsCreatedMessage).contains('No cards have been created.').should('be.visible');
  });
});
