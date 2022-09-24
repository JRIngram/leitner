import selectors from '../support/selectors';
import {
  createEndToEndCards, createEndToEndQuiz, deleteEndToEndCards, deleteEndToEndQuiz,
} from '../support/commands';

describe('studying quiz flow', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
    createEndToEndCards();
    createEndToEndQuiz();
  });

  after(() => {
    deleteEndToEndQuiz();
    deleteEndToEndCards();
  });

  it('can study a quiz and see the review screen', () => {
    const quizName = 'Latin animal names';
    const firstQuestion = 'What is the latin name for the "Eastern Gray Squirrel"?';
    const firstAnswer = 'Sciurus carolinensis';
    const testAnswer = 'I am a test answer';

    cy.get(selectors.studyNavButton).click();
    cy.get(selectors.startQuizButton).click();
    cy.contains(selectors.quizTitle, quizName);
    cy.contains(selectors.quizQuestionCount, 'Question 1 of 3');
    cy.contains(selectors.quizQuestion, firstQuestion);
    cy.get(selectors.quizAnswerInput).type(`${testAnswer} 1`);
    cy.get(selectors.submitAnswerButton).click();
    cy.get(selectors.incorrectAnswerButton).should('exist');
    cy.get(selectors.correctAnswerButton).click();
    cy.get(selectors.quizAnswerInput).type(`${testAnswer} 2`);
    cy.get(selectors.submitAnswerButton).click();
    cy.get(selectors.correctAnswerButton).should('exist');
    cy.get(selectors.incorrectAnswerButton).click();
    cy.get(selectors.quizAnswerInput).type(`${testAnswer} 3`);
    cy.get(selectors.submitAnswerButton).click();
    cy.get(selectors.correctAnswerButton).should('exist');
    cy.get(selectors.incorrectAnswerButton).click();

    cy.contains(selectors.quizReviewTitle, 'Quiz Review');
    cy.contains(selectors.quizAnswerPercentage, '1 correct out of 3 - 33.33%');
    cy.contains(selectors.firstQuestionReviewPrompt, 'Prompt: What is the latin name for the "Eastern Gray Squirrel"?');
    cy.contains(selectors.firstQuestionReviewGivenAnswer, `Your Answer: ${testAnswer} 1`);
    cy.contains(selectors.firstQuestionReviewActualAnswer, `Actual Answer: ${firstAnswer}`);
    cy.get(selectors.finishReviewButton).click();
    cy.get(selectors.startQuizButton).should('exist');
  });
});
