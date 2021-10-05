/* eslint-disable jest/no-done-callback */
/* eslint-disable jest/expect-expect */
import { Selector } from 'testcafe';
import { dropAllTestCollections } from '../testUtils/testUtils';
import { selectors, url } from './constants';

const {
  addCardButton,
  addCardsButton,
  answerInput,
  deleteCardButton,
  manageNavButton,
  promptInput,
} = selectors;

fixture`manage cards`
  .page`${url}`
  .before(async () => {
    await dropAllTestCollections();
  });

test('can add and then delete a card', async (t) => {
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
