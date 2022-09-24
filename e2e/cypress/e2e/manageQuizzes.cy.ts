import { createEndToEndCards, deleteEndToEndCards } from '../support/commands';
import {
  quizName,
  quizDescription,
  updatedQuizName,
  updatedQuizDescription,
} from '../support/constants';
import {
  addCardCheckBox,
  amendQuizzesPromptOneBoxOne,
  amendQuizzesPromptThreeBoxThree,
  amendQuizzesPromptTwoBoxTwo,
  ammendQuizzesButton,
  boxOne,
  boxThree,
  boxTwo,
  confirmAddQuizButton,
  confirmEditQuizButton,
  deleteQuizButton,
  editQuizButton,
  firstQuizBox,
  firstQuizDescription,
  firstQuizName,
  manageNavButton,
  manageQuizzesButton,
  noQuizzesCreatedMessage,
  quizDescriptionInput,
  quizNameInput,
  quizSuccessfullyAdded,
  studyNavButton,
} from '../support/selectors';

describe('manage cards', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
    createEndToEndCards();
  });

  after(() => {
    deleteEndToEndCards();
  });

  it('can add a quiz', () => {
    cy.get(studyNavButton).click();
    cy.get(noQuizzesCreatedMessage).should('exist');
    cy.get(manageNavButton).click();
    cy.get(manageQuizzesButton).click();
    cy.get(quizNameInput).type(quizName);
    cy.get(quizDescriptionInput).type(quizDescription);
    cy.get(confirmAddQuizButton).should('not.exist');
    cy.get(`${addCardCheckBox}0`).click();
    cy.get(`${addCardCheckBox}1`).click();
    cy.get(`${addCardCheckBox}2`).click();
    cy.get(confirmAddQuizButton).click();
    cy.get(quizSuccessfullyAdded).should('exist');
    cy.get(ammendQuizzesButton).click();
    cy.get(boxOne).should('exist');
    cy.get(amendQuizzesPromptOneBoxOne).should('exist');
    cy.get(amendQuizzesPromptTwoBoxTwo).should('exist');
    cy.get(amendQuizzesPromptThreeBoxThree).should('exist');
    cy.get(boxTwo).should('exist');
    cy.get(boxThree).should('exist');
    cy.get(studyNavButton).click();
    cy.contains(firstQuizName, quizName);
    cy.contains(firstQuizDescription, quizDescription);
    cy.get(firstQuizBox).should('exist');
    cy.get(noQuizzesCreatedMessage).should('not.exist');
  });

  it('can edit quizzes', () => {
    cy.get(manageNavButton).click();
    cy.get(manageQuizzesButton).click();
    cy.get(ammendQuizzesButton).click();
    cy.get(editQuizButton).click();
    cy.get(quizNameInput).clear().type(updatedQuizName);
    cy.get(quizDescriptionInput).clear().type(updatedQuizDescription);
    cy.get(confirmEditQuizButton).click();
    cy.get(studyNavButton).click();
    cy.contains(firstQuizName, updatedQuizName);
    cy.contains(firstQuizDescription, updatedQuizDescription);
  });

  it('can delete quiz', () => {
    cy.get(manageNavButton).click();
    cy.get(manageQuizzesButton).click();
    cy.get(ammendQuizzesButton).click();
    cy.get(deleteQuizButton).click();
    cy.get(deleteQuizButton).should('not.exist');
    cy.get(studyNavButton).click();
  });
});
