import selectors from '../support/selectors';
import { createEndToEndCards, createEndToEndQuiz } from '../support/commands'

describe('manage cards', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
    createEndToEndCards();
  });

  after(() => {
    // clean up created quizzes
  });

  it('can add a quiz', () => {
    const quizName = 'Latin animal names';
    const quizDescription = 'All things Latin and furry!';

    cy.get(selectors.studyNavButton).click();
    cy.get(selectors.noQuizzesCreatedMessage).should('exist');
    cy.get(selectors.manageNavButton).click();
    cy.get(selectors.manageQuizzesButton).click();
    cy.get(selectors.quizNameInput).type(quizName);
    cy.get(selectors.quizDescriptionInput).type(quizDescription);
    cy.get(selectors.confirmAddQuizButton).should('not.exist');
    cy.get(`${selectors.addCardCheckBox}0`).click();
    cy.get(`${selectors.addCardCheckBox}1`).click();
    cy.get(`${selectors.addCardCheckBox}2`).click();
    cy.get(selectors.confirmAddQuizButton).click();
    cy.get(selectors.quizSuccessfullyAdded).should('exist');
    cy.get(selectors.ammendQuizzesButton).click();
    cy.get(selectors.boxOne).should('exist');
    cy.get(selectors.amendQuizzesPromptOneBoxOne).should('exist');
    cy.get(selectors.amendQuizzesPromptTwoBoxTwo).should('exist');
    cy.get(selectors.amendQuizzesPromptThreeBoxThree).should('exist');
    cy.get(selectors.boxTwo).should('exist');
    cy.get(selectors.boxThree).should('exist');
    cy.get(selectors.studyNavButton).click();
    cy.get(selectors.firstQuizName).contains(quizName);
    cy.get(selectors.firstQuizDescription).contains(quizDescription);
    cy.get(selectors.firstQuizBox).should('exist');
    cy.get(selectors.noQuizzesCreatedMessage).should('not.exist');
  });

  it('can edit quizzes', () => {
    // double check this is doing what is expected
    const updatedQuizName = 'Latin animal names';
    const updatedQuizDescription = 'All things Latin and furry!';

    cy.get(selectors.manageNavButton).click();
    cy.get(selectors.manageQuizzesButton).click();
    cy.get(selectors.ammendQuizzesButton).click();
    cy.get(selectors.editQuizButton).click();
    cy.get(selectors.quizNameInput).clear().type(updatedQuizName);
    cy.get(selectors.quizDescriptionInput).clear().type(updatedQuizDescription);
    cy.get(selectors.confirmEditQuizButton).click();
    cy.get(selectors.studyNavButton).click();
    cy.get(selectors.firstQuizName).contains(updatedQuizName);
    cy.get(selectors.firstQuizDescription).contains(updatedQuizDescription);
  });

  it('can delete quiz', () => {
    cy.get(selectors.manageNavButton).click();
    cy.get(selectors.manageQuizzesButton).click();
    cy.get(selectors.ammendQuizzesButton).click();
    cy.get(selectors.deleteQuizButton).click();
    cy.get(selectors.deleteQuizButton).should('not.exist');
    cy.get(selectors.studyNavButton).click();
  });

});
