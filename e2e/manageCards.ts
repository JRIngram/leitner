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
};

fixture`manage cards`
  .page`${url}`
  .before(async () => {
    await dropAllTestCollections();
  });

test('can add and then delete a card', async (t) => {
  const {
    manageNavButton, addCardButton, addCardsButton,
    deleteCardButton, promptInput, answerInput,
  } = selectors;
  const savedPrompt = Selector('p').withText('Prompt: What is the latin name for the "Eastern Gray Squirrel"?');
  const savedAnswer = Selector('p').withText('Answer: Sciurus caroline');
  await t
    .click(manageNavButton)
    .click(addCardsButton)
    .typeText(promptInput, 'What is the latin name for the "Eastern Gray Squirrel"?')
    .typeText(answerInput, 'Sciurus carolinensis')
    .click(addCardButton)
    .expect(savedPrompt.visible)
    .ok()
    .expect(savedAnswer.visible)
    .ok()
    .click(deleteCardButton)
    .expect(savedPrompt.exists)
    .notOk()
    .expect(savedAnswer.exists)
    .notOk();
});

test('can cancel adding a card', async (t) => {
  const {
    manageNavButton, addCardsButton, promptInput, answerInput,
  } = selectors;
  const cancelButton = Selector('#coloured-button-cancel');
  const savedPrompt = Selector('p').withText('Prompt: What is the latin name for the "Barn Owl"?');
  const savedAnswer = Selector('p').withText('Answer: Tyto alba');
  await t
    .click(manageNavButton)
    .click(addCardsButton)
    .typeText(promptInput, 'What is the latin name for the "Barn Owl"?')
    .typeText(answerInput, 'Tyto alba')
    .click(cancelButton)
    .expect(savedPrompt.exists)
    .notOk()
    .expect(savedAnswer.exists)
    .notOk();
});

test('can create, update and delete a card', async (t) => {
  const {
    manageNavButton, addCardButton, addCardsButton,
    deleteCardButton, promptInput, answerInput,
  } = selectors;
  const editButton = Selector('#coloured-button-edit');
  const editCardButton = Selector('#coloured-button-edit-card');
  const savedPrompt = Selector('p').withText('Prompt: What is the latin name for the "Barn Owl"?');
  const savedAnswer = Selector('p').withText('Answer: Tyto alba');
  await t
    .click(manageNavButton)
    .click(addCardsButton)
    .typeText(promptInput, 'Prompt: What is the latin name for the "Owl"?')
    .typeText(answerInput, 'Answer: Tyto alba')
    .click(addCardButton)
    .click(editButton)
    .click(promptInput)
    .pressKey('ctrl+a delete')
    .typeText(promptInput, 'What is the latin name for the "Barn Owl"?')
    .click(answerInput)
    .pressKey('ctrl+a delete')
    .typeText(answerInput, 'Tyto alba')
    .click(editCardButton)
    .expect(savedPrompt.visible)
    .ok()
    .expect(savedAnswer.visible)
    .ok()
    .click(deleteCardButton)
    .expect(savedPrompt.exists)
    .notOk()
    .expect(savedAnswer.exists)
    .notOk();
});
