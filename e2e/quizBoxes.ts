// eslint-disable-next-line import/no-extraneous-dependencies
import { Selector } from 'testcafe';
import { dropAllTestCollections } from '../testUtils/testUtils';
import { selectors, url } from './constants';

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
