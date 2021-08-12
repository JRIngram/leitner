// eslint-disable-next-line import/no-extraneous-dependencies
import { Selector } from 'testcafe';
import { dropAllTestCollections } from '../testUtils/testUtils';
import url from './constants';

const selectors = {
  // Set up
  manageNavButton: Selector('p').withText('Manage'),
  addCardsButton: Selector('#coloured-button-add-cards'),
  addCardButton: Selector('#coloured-button-add-card'),
  promptInput: Selector('#prompt'),
  answerInput: Selector('#answer'),
  manageQuizzesButton: Selector('#coloured-button-manage-quizzes'),
  quizNameInput: Selector('#quizName'),
  quizDescriptionInput: Selector('#quizDescription'),
  addQuizButton: Selector('#coloured-button-confirm-add-quiz'),
  confirmEditQuizButton: Selector('#coloured-button-confirm-edit-quiz'),
  cardOnePrompt: Selector('li').withText('What is the latin name for the "Eastern Gray Squirrel"?'),
  cardTwoPrompt: Selector('li').withText('What is the latin name for the "Barn Owl"?'),
  // Study Specific
  quizTitle: Selector('h1').withText('Latin animal names'),
  quizReviewHeader: Selector('h2').withText('Quiz Review'),
  studyNavButton: Selector('p').withText('Study'),
  startQuizButton: Selector('#coloured-button-start-quiz'),
  quizAnswerInput: Selector('#answer-input'),
  quizPrompt: Selector('#quizPrompt'),
  submitAnswer: Selector('#coloured-button-submit-answer'),
  correctAnswerButton: Selector('#coloured-button-correct'),
  incorrectAnswerButton: Selector('#coloured-button-incorrect'),
  quizScore: Selector('h3').withText('2 correct out of 3 - 66.67%'),
  finishQuizButton: Selector('#coloured-button-finish-review'),
  quizBoxDropdown: Selector('#quizBoxes'),
  quizBoxDropdownOnePlus: Selector('#quizBoxes-1'),
  quizBoxDropdownTwoPlus: Selector('#quizBoxes-2'),
  quizBoxDropdownThree: Selector('#quizBoxes-3'),
};

// @ts-ignore
const addQuiz = async (t) => {
  const {
    manageNavButton, addCardButton, addCardsButton,
    promptInput, answerInput, manageQuizzesButton,
    quizNameInput, quizDescriptionInput, addQuizButton,
  } = selectors;
  await t
    .click(manageNavButton)
    .click(addCardsButton)
    .typeText(promptInput, 'What is the latin name for the "Eastern Gray Squirrel"?')
    .typeText(answerInput, 'Sciurus carolinensis')
    .click(addCardButton)
    .click(addCardsButton)
    .typeText(promptInput, 'What is the latin name for the "Barn Owl"?')
    .typeText(answerInput, 'Tyto alba')
    .click(addCardButton)
    .click(addCardsButton)
    .typeText(promptInput, 'What is the latin name for the "Eurasian otter"?')
    .typeText(answerInput, 'Lutra lutra')
    .click(addCardButton)
    .click(manageQuizzesButton)
    .typeText(quizNameInput, 'Latin animal names')
    .typeText(quizDescriptionInput, 'All things Latin and furry!')
    .click(Selector('#add-card-checkbox-0'))
    .click(Selector('#add-card-checkbox-1'))
    .click(Selector('#add-card-checkbox-2'))
    .click(addQuizButton);
};

fixture`quiz boxes`
  .page`${url}`
  .before(async () => {
    await dropAllTestCollections();
  });

test.before(async (t) => {
  await addQuiz(t);
})('when studying a quiz, the cards move boxes when marked as correct or incorrect', async (t) => {
  const {
    studyNavButton, startQuizButton, quizAnswerInput, submitAnswer,
    correctAnswerButton, incorrectAnswerButton,
    finishQuizButton, quizBoxDropdown, quizBoxDropdownOnePlus,
    quizBoxDropdownTwoPlus, quizBoxDropdownThree,
  } = selectors;
  await t
    // Box 1+ Initial
    .click(studyNavButton)
    .expect(quizBoxDropdown.exists)
    .ok()
    .expect(quizBoxDropdownOnePlus.exists)
    .ok()
    .expect(quizBoxDropdownTwoPlus.exists)
    .ok()
    .expect(quizBoxDropdownThree.exists)
    .ok()
    .click(startQuizButton)
    .expect(Selector('h2').withText('Question 1 of 3').visible)
    .ok()
    .typeText(quizAnswerInput, 'I am a correct answer')
    .click(submitAnswer)
    .click(correctAnswerButton)
    .typeText(quizAnswerInput, 'I am a correct answer')
    .click(submitAnswer)
    .click(correctAnswerButton)
    .typeText(quizAnswerInput, 'I am an incorrect answer')
    .click(submitAnswer)
    .click(incorrectAnswerButton)
    .click(finishQuizButton)
    // Check Box 3 is empty
    .click(quizBoxDropdown)
    .click(quizBoxDropdownThree)
    .click(startQuizButton)
    .expect(Selector('h3').withText('0 correct out of 0 - NaN%').visible)
    .ok()
    .click(finishQuizButton)
    // Check Box 2 has two cards and progress
    .click(quizBoxDropdown)
    .click(quizBoxDropdownTwoPlus)
    .click(startQuizButton)
    .expect(Selector('h2').withText('Question 1 of 2').visible)
    .ok()
    .typeText(quizAnswerInput, 'I am a correct answer')
    .click(submitAnswer)
    .click(correctAnswerButton)
    .typeText(quizAnswerInput, 'I am an incorrect answer')
    .click(submitAnswer)
    .click(incorrectAnswerButton)
    .click(finishQuizButton)
    // Check Box 2+ has one card
    .click(quizBoxDropdown)
    .click(quizBoxDropdownTwoPlus)
    .click(startQuizButton)
    .expect(Selector('h2').withText('Question 1 of 1').visible)
    .ok()
    .typeText(quizAnswerInput, 'I am a correct answer')
    .click(submitAnswer)
    .click(correctAnswerButton)
    .click(finishQuizButton)
    // Check Box 3 has one card
    .click(quizBoxDropdown)
    .click(quizBoxDropdownThree)
    .click(startQuizButton)
    .expect(Selector('h2').withText('Question 1 of 1').visible)
    .ok()
    .click(submitAnswer)
    .click(correctAnswerButton)
    .click(finishQuizButton)
    // Check box 1+ has 3 cards
    .click(startQuizButton)
    .expect(Selector('h2').withText('Question 1 of 3').visible)
    .ok();
});
