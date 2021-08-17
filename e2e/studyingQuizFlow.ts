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

fixture`studying quiz flow`
  .page`${url}`
  .before(async () => {
    await dropAllTestCollections();
  });

test
  .before(async (t) => {
    await addQuiz(t);
  })('can study a quiz and see the review screen', async (t) => {
    const {
      studyNavButton, startQuizButton, quizPrompt, quizAnswerInput, submitAnswer,
      correctAnswerButton, incorrectAnswerButton, quizTitle, quizReviewHeader,
      quizScore, finishQuizButton,
    } = selectors;

    await t
      .click(studyNavButton)
      .click(startQuizButton)
      .expect(quizTitle.exists)
      .ok()
      .expect(Selector('h2').withText('Question 1 of 3').exists)
      .ok()
      .expect(quizPrompt.exists)
      .ok()
      .typeText(quizAnswerInput, 'I am a correct answer')
      .click(submitAnswer)
      .expect(Selector('p').withText('You said: I am a correct answer').exists)
      .ok()
      .expect(Selector('p').withText('The actual answer is').exists)
      .ok()
      .expect(Selector('p').withText('Did you get the answer correct?').exists)
      .ok()
      .expect(correctAnswerButton.exists)
      .ok()
      .expect(incorrectAnswerButton.exists)
      .ok()
      .click(correctAnswerButton)
      .expect(quizPrompt.exists)
      .ok()
      .typeText(quizAnswerInput, 'I am an incorrect answer')
      .click(submitAnswer)
      .expect(Selector('p').withText('You said: I am an incorrect answer').exists)
      .ok()
      .expect(Selector('p').withText('The actual answer is').exists)
      .ok()
      .expect(Selector('p').withText('Did you get the answer correct?').exists)
      .ok()
      .expect(correctAnswerButton.exists)
      .ok()
      .expect(incorrectAnswerButton.exists)
      .ok()
      .click(incorrectAnswerButton)
      .expect(quizPrompt.exists)
      .ok()
      .typeText(quizAnswerInput, 'I am the final correct answer')
      .click(submitAnswer)
      .expect(Selector('p').withText('You said: I am the final correct answer').exists)
      .ok()
      .expect(Selector('p').withText('The actual answer is').exists)
      .ok()
      .expect(Selector('p').withText('Did you get the answer correct?').exists)
      .ok()
      .expect(correctAnswerButton.exists)
      .ok()
      .expect(incorrectAnswerButton.exists)
      .ok()
      .click(correctAnswerButton)
      .expect(quizReviewHeader.exists)
      .ok()
      .expect(quizScore.exists)
      .ok()
      .expect(Selector('p').withText('Prompt: What is the latin name for the "Eastern Gray Squirrel"?').exists)
      .ok()
      .expect(Selector('p').withText('Your Answer: I am a correct answer').exists)
      .ok()
      .expect(Selector('p').withText('Actual Answer: Sciurus carolinensis').exists)
      .ok()
      .expect(Selector('p').withText('Prompt: What is the latin name for the "Eastern Gray Squirrel"?').exists)
      .ok()
      .expect(Selector('p').withText('Your Answer: I am an incorrect answer').exists)
      .ok()
      .expect(Selector('p').withText('Actual Answer: Tyto alba').exists)
      .ok()
      .expect(Selector('p').withText('Prompt: What is the latin name for the "Barn Owl"?').exists)
      .ok()
      .expect(Selector('p').withText('Your Answer: I am the final correct answer').exists)
      .ok()
      .expect(Selector('p').withText('Actual Answer: Lutra lutra').exists)
      .ok()
      .click(finishQuizButton)
      .expect(startQuizButton.exists)
      .ok();
  });
