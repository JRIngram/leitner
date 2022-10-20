import { correctAnswer, incorrectAnswer } from '../support/constants';
import {
  createEndToEndCards,
  createEndToEndQuiz,
  deleteEndToEndCards,
  deleteEndToEndQuiz,
} from '../support/commands';
import {
  correctAnswerButton,
  finishReviewButton,
  incorrectAnswerButton,
  quizAnswerInput,
  quizAnswerPercentage,
  quizBoxDropdown,
  quizQuestionCount,
  startQuizButton,
  studyNavButton,
  submitAnswerButton,
} from '../support/selectors';

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
    cy.get(studyNavButton).click();
    cy.get(quizBoxDropdown).should('exist');
    cy.get(quizBoxDropdown).select(0);
    cy.get(startQuizButton).click();
    cy.contains(quizQuestionCount, 'Question 1 of 3');
    cy.get(quizAnswerInput).type(correctAnswer);
    cy.get(submitAnswerButton).click();
    cy.get(correctAnswerButton).click();
    cy.get(quizAnswerInput).type(correctAnswer);
    cy.get(submitAnswerButton).click();
    cy.get(correctAnswerButton).click();
    cy.get(quizAnswerInput).type(incorrectAnswer);
    cy.get(submitAnswerButton).click();
    cy.get(incorrectAnswerButton).click();
    cy.get(finishReviewButton).click();

    // box two
    cy.get(quizBoxDropdown).select(1);
    cy.get(startQuizButton).click();
    cy.contains(quizQuestionCount, 'Question 1 of 2');
    cy.get(quizAnswerInput).type(correctAnswer);
    cy.get(submitAnswerButton).click();
    cy.get(correctAnswerButton).click();
    cy.get(quizAnswerInput).type(incorrectAnswer);
    cy.get(submitAnswerButton).click();
    cy.get(incorrectAnswerButton).click();
    cy.get(finishReviewButton).click();

    // check box three has one card
    cy.get(quizBoxDropdown).select(2);
    cy.get(startQuizButton).click();
    cy.contains(quizQuestionCount, 'Question 1 of 1');
    cy.get(quizAnswerInput).type(correctAnswer);
    cy.get(submitAnswerButton).click();
    cy.get(correctAnswerButton).click();
    cy.get(finishReviewButton).click();

    // check box one has two cards
    cy.get(quizBoxDropdown).select(0);
    cy.get(startQuizButton).click();
    cy.contains(quizQuestionCount, 'Question 1 of 2');
    cy.get(quizAnswerInput).type(incorrectAnswer);
    cy.get(submitAnswerButton).click();
    cy.get(incorrectAnswerButton).click();
    cy.get(quizAnswerInput).type(incorrectAnswer);
    cy.get(submitAnswerButton).click();
    cy.get(incorrectAnswerButton).click();
    cy.get(finishReviewButton).click();
  });

  it('does not have an answer input if quiz box is empty', () => {
    cy.get(studyNavButton).click();
    cy.get(quizBoxDropdown).select(1);
    cy.get(startQuizButton).click();
    cy.contains(quizAnswerPercentage, '0 correct out of 0 - NaN%');
    cy.get(quizAnswerInput).should('not.exist');
    cy.get(finishReviewButton).click();
  });
});
