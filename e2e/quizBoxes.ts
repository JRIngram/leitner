// eslint-disable-next-line import/no-extraneous-dependencies
import { Selector } from 'testcafe';
import { createEndToEndQuiz, dropAllTestCollections } from '../testUtils/testUtils';
import { selectors, url } from './constants';

const {
  correctAnswerButton,
  finishQuizButton,
  incorrectAnswerButton,
  quizAnswerInput,
  quizBoxDropdown,
  quizBoxDropdownOnePlus,
  quizBoxDropdownThree,
  quizBoxDropdownTwoPlus,
  startQuizButton,
  studyNavButton,
  submitAnswer,
} = selectors;

fixture`quiz boxes`
  .page`${url}`
  .before(async () => {
    await dropAllTestCollections();
    await createEndToEndQuiz();
  });

test('when studying a quiz, the cards move boxes when marked as correct or incorrect', async (t) => {
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
