import {
  correctAnswerButton,
  finishReviewButton,
  firstQuestionReviewActualAnswer,
  firstQuestionReviewGivenAnswer,
  firstQuestionReviewPrompt,
  incorrectAnswerButton,
  quizAnswerInput,
  quizAnswerPercentage,
  quizQuestion,
  quizQuestionCount,
  quizReviewTitle,
  quizTitle,
  startQuizButton,
  studyNavButton,
  submitAnswerButton,
} from '../support/selectors';
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

    cy.get(studyNavButton).click();
    cy.get(startQuizButton).click();
    cy.contains(quizTitle, quizName);
    cy.contains(quizQuestionCount, 'Question 1 of 3');
    cy.contains(quizQuestion, firstQuestion);
    cy.get(quizAnswerInput).type(`${testAnswer} 1`);
    cy.get(submitAnswerButton).click();
    cy.get(incorrectAnswerButton).should('exist');
    cy.get(correctAnswerButton).click();
    cy.get(quizAnswerInput).type(`${testAnswer} 2`);
    cy.get(submitAnswerButton).click();
    cy.get(correctAnswerButton).should('exist');
    cy.get(incorrectAnswerButton).click();
    cy.get(quizAnswerInput).type(`${testAnswer} 3`);
    cy.get(submitAnswerButton).click();
    cy.get(correctAnswerButton).should('exist');
    cy.get(incorrectAnswerButton).click();

    cy.contains(quizReviewTitle, 'Quiz Review');
    cy.contains(quizAnswerPercentage, '1 correct out of 3 - 33.33%');
    cy.contains(firstQuestionReviewPrompt, 'Prompt: What is the latin name for the "Eastern Gray Squirrel"?');
    cy.contains(firstQuestionReviewGivenAnswer, `Your Answer: ${testAnswer} 1`);
    cy.contains(firstQuestionReviewActualAnswer, `Actual Answer: ${firstAnswer}`);
    cy.get(finishReviewButton).click();
    cy.get(startQuizButton).should('exist');
  });
});
