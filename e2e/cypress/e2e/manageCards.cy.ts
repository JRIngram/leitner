import { selectors } from '../support/selectors';

describe('manage cards', () => {
  before(() => {
    cy.visit('http://localhost:3000/')
  })

  it('can add and then delete a card', () => {
    // manage
    cy.get(selectors.manageNavButton).click();
    cy.get(selectors.addCardsButton).click();
    cy.get(selectors.promptInput).type('What is the latin name for the "Eastern Gray Squirrel"?')
    cy.get(selectors.answerInput).type('Sciurus carolinensis')
    cy.get(selectors.addCardButton).click()
    cy.get(selectors.savedPrompt).should('be.visible')
    cy.get(selectors.savedAnswer);
    cy.get(selectors.deleteCardButton).click()
    cy.get(selectors.savedPrompt).should('not.exist');
    cy.get(selectors.savedAnswer).should('not.exist');
  });

  it('can cancel adding a card', () => {
    cy.get(selectors.manageNavButton).click();
    cy.get(selectors.addCardsButton).click();
    cy.get(selectors.promptInput).type('What is the latin name for the "Barn Owl"?');
    cy.get(selectors.answerInput).type('Tyto alba');
    cy.get(selectors.cancelCardButton).click();
    cy.get(selectors.savedPrompt).should('not.exist');
    cy.get(selectors.savedAnswer).should('not.exist');
  });

  it('can create, update and delete a card', () => {
    cy.get(selectors.manageNavButton).click();
    cy.get(selectors.addCardsButton).click();
    cy.get(selectors.promptInput).type('Prompt: What is the latin name for the "Owl"?');
    cy.get(selectors.answerInput).type('Tyto alba');
    cy.get(selectors.addCardButton).click();
    cy.get(selectors.editCardButton).click();
    cy.get(selectors.promptInput).clear()
    cy.get(selectors.promptInput).type('Prompt: What is the latin name for the "Tawny Owl"?');
    cy.get(selectors.answerInput).clear()
    cy.get(selectors.answerInput).type('Strix aluco');
    cy.get(selectors.greenEditCardButton).click();
    cy.get(selectors.savedPrompt).should('be.visible');
    cy.get(selectors.savedAnswer).should('be.visible');
    cy.get(selectors.deleteCardButton);
    cy.get(selectors.savedPrompt).should('be.visible');
    cy.get(selectors.savedAnswer).should('be.visible');
  });
});