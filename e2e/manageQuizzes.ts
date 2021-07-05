// eslint-disable-next-line import/no-extraneous-dependencies
import { Selector } from 'testcafe';
import { dropAllTestCollections } from '../testUtils/testUtils';
import url from './constants';

const selectors = {
  manageNavButton: Selector('p').withText('Manage'),
  addCardsButton: Selector('#coloured-button-add-cards'),
  addCardButton: Selector('#coloured-button-add-card'),
  deleteCardButton: Selector('#coloured-button-delete'),
  promptInput: Selector('#prompt'),
  answerInput: Selector('#answer'),
  manageQuizzesButton: Selector('#coloured-button-manage-quizzes'),
  quizNameInput: Selector('#quizName'),
  quizDescriptionInput: Selector('#quizDescription'),
  quizMustContainCards: Selector('p').withText('A quiz must contain at least one card'),
  addQuizButton: Selector('#coloured-button-confirm-add-quiz'),
  quizAddedText: Selector('p').withText('Quiz successfully added.'),
  amendQuizzesButton: Selector('#coloured-button-amend-quizzes'),
  deleteQuizButton: Selector('#coloured-button-delete-quiz')
};

const addCards = async (t) => {
  const {
    manageNavButton, addCardButton, addCardsButton,
    promptInput, answerInput
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
}

const addQuiz = async (t) => {
  const {
    manageQuizzesButton, quizNameInput, quizDescriptionInput,
    addQuizButton, amendQuizzesButton
  } = selectors;

  await addCards(t)

  await t
    .click(manageQuizzesButton)
    .typeText(quizNameInput, 'Latin animal names')
    .typeText(quizDescriptionInput, 'All things Latin and furry!')
    .click(Selector('#add-card-checkbox-0'))
    .click(Selector('#add-card-checkbox-1'))
    .click(addQuizButton)
    .click(amendQuizzesButton)
}

fixture`manage quizzes`
  .page`${url}`
  .before(async (t) => {
    await dropAllTestCollections();
  });

test
  .before(async t => { await addCards(t) })
  ('can add a quiz', async (t) => {
    const {
      manageQuizzesButton, quizNameInput, quizDescriptionInput, quizMustContainCards,
      addQuizButton, quizAddedText, amendQuizzesButton
    } = selectors;
    await t
      .click(manageQuizzesButton)
      .typeText(quizNameInput, 'Latin animal names')
      .typeText(quizDescriptionInput, 'All things Latin and furry!')
      .expect(quizMustContainCards.exists)
      .ok()
      .expect(addQuizButton.exists)
      .notOk()
      .click(Selector('#add-card-checkbox-0'))
      .expect(quizMustContainCards.exists)
      .notOk()
      .expect(addQuizButton.exists)
      .ok()
      .click(Selector('#add-card-checkbox-1'))
      .expect(quizMustContainCards.exists)
      .notOk()
      .click(addQuizButton)
      .expect(quizAddedText.exists)
      .ok()
      .click(amendQuizzesButton)
      .expect(Selector('p').withText('Name: Latin animal names').exists)
      .ok()
  });

test
  .before(async t => { 
    await dropAllTestCollections();
    await addQuiz(t) 
  })
  ('can delete quizzes', async (t) => {
    const {
      manageQuizzesButton, amendQuizzesButton, deleteQuizButton,
    } = selectors;
    await t
      .expect(Selector('p').withText('Name: Latin animal names').exists)
      .ok()
      .click(deleteQuizButton)
      .expect(deleteQuizButton.exists)
      .notOk()
      .expect(Selector('p').withText('Name: Latin animal names').exists)
      .notOk()
      .expect(Selector('p').withText('No quizzes have been created.').exists)
      .ok()
  })

