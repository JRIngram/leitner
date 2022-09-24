import selectors from '../support/selectors';
import {
  createEndToEndCards, createEndToEndQuiz, deleteEndToEndCards, deleteEndToEndQuiz,
} from '../support/commands';

describe('quizBoxes', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
    createEndToEndCards();
    createEndToEndQuiz();
  });

  after(() => {
    deleteEndToEndCards();
    deleteEndToEndQuiz();
  });
  it('when studying a quiz, the cards move boxes when marked as correct or incorrect', () => {
    const correctAnswer = 'I am a correct answer';
    const incorrectAnswer = 'I am an incorrect answer';

    cy.get(selectors.studyNavButton).click();
    cy.get(selectors.quizBoxDropdown).should('exist');
    cy.get(selectors.quizBoxDropdown).select(0);
    cy.get(selectors.startQuizButton).click();
    cy.contains(selectors.quizQuestionCount, 'Question 1 of 3');
    cy.get(selectors.quizAnswerInput).type(correctAnswer);
    cy.get(selectors.submitAnswerButton).click();
    cy.get(selectors.correctAnswerButton).click();
    cy.get(selectors.quizAnswerInput).type(correctAnswer);
    cy.get(selectors.submitAnswerButton).click();
    cy.get(selectors.correctAnswerButton).click();
    cy.get(selectors.quizAnswerInput).type(incorrectAnswer);
    cy.get(selectors.submitAnswerButton).click();
    cy.get(selectors.incorrectAnswerButton).click();
    cy.get(selectors.finishReviewButton).click();

    // box two
    cy.get(selectors.quizBoxDropdown).select(1);
    cy.get(selectors.startQuizButton).click();
    cy.contains(selectors.quizQuestionCount, 'Question 1 of 2');
    cy.get(selectors.quizAnswerInput).type(correctAnswer);
    cy.get(selectors.submitAnswerButton).click();
    cy.get(selectors.correctAnswerButton).click();
    cy.get(selectors.quizAnswerInput).type(incorrectAnswer);
    cy.get(selectors.submitAnswerButton).click();
    cy.get(selectors.incorrectAnswerButton).click();
    cy.get(selectors.finishReviewButton).click();

    // check box three has one card
    cy.get(selectors.quizBoxDropdown).select(2);
    cy.get(selectors.startQuizButton).click();
    cy.contains(selectors.quizQuestionCount, 'Question 1 of 1');
    cy.get(selectors.quizAnswerInput).type(correctAnswer);
    cy.get(selectors.submitAnswerButton).click();
    cy.get(selectors.correctAnswerButton).click();
    cy.get(selectors.finishReviewButton).click();

    // check box one has two cards
    cy.get(selectors.quizBoxDropdown).select(0);
    cy.get(selectors.startQuizButton).click();
    cy.contains(selectors.quizQuestionCount, 'Question 1 of 2');
    cy.get(selectors.quizAnswerInput).type(incorrectAnswer);
    cy.get(selectors.submitAnswerButton).click();
    cy.get(selectors.incorrectAnswerButton).click();
    cy.get(selectors.quizAnswerInput).type(incorrectAnswer);
    cy.get(selectors.submitAnswerButton).click();
    cy.get(selectors.incorrectAnswerButton).click();
    cy.get(selectors.finishReviewButton).click();
  });

  it('does not have an answer input if quiz box is empty', () => {
    cy.get(selectors.studyNavButton).click();
    cy.get(selectors.quizBoxDropdown).select(1);
    cy.get(selectors.startQuizButton).click();
    cy.contains(selectors.quizAnswerPercentage, '0 correct out of 0 - NaN%');
    cy.get(selectors.quizAnswerInput).should('not.exist');
    cy.get(selectors.finishReviewButton).click();
  });
});
