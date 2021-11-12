/* eslint-disable jest/no-done-callback */
/* eslint-disable jest/expect-expect */
import { Selector } from 'testcafe';
import { createEndToEndCards, dropAllTestCollections } from '../testUtils/testUtils';
import { selectors, url } from './constants';

const {
  manageNavButton,
  manageQuizzesButton,
  quizNameInput,
  quizDescriptionInput,
  quizMustContainCards,
  addQuizButton,
  quizAddedText,
  amendQuizzesButton,
  studyNavButton,
  noQuizzesCreatedText,
  cardOnePrompt,
  cardTwoPrompt,
  confirmEditQuizButton,
  editQuizButton,
  deleteQuizButton,

} = selectors;

fixture`manage quizzes`
  .page`${url}`
  .before(async () => {
    await dropAllTestCollections();
  });

test.before(async () => {
  await createEndToEndCards();
})('can add a quiz', async (t) => {
  await t
    .click(studyNavButton)
    .expect(noQuizzesCreatedText.exists)
    .ok()
    .click(manageNavButton)
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
    .click(Selector('#add-card-checkbox-1'))
    .click(addQuizButton)
    .expect(quizAddedText.exists)
    .ok()
    .click(amendQuizzesButton)
    .expect(Selector('p').withText('Name: Latin animal names').exists)
    .ok()
    .expect(Selector('p').withText('All things Latin and furry!').exists)
    .ok()
    .expect(Selector('li').withText('Box One:').exists)
    .ok()
    .expect(cardOnePrompt.exists)
    .ok()
    .expect(cardTwoPrompt.exists)
    .notOk()
    .expect(Selector('li').withText('Box Two:').exists)
    .ok()
    .expect(Selector('li').withText('Box Three:').exists)
    .ok()
    .click(studyNavButton)
    .expect(noQuizzesCreatedText.exists)
    .notOk()
    .expect(Selector('p').withText('Name: Latin animal names').exists)
    .ok();
}).after(async (t) => {
  await t
    .click(manageNavButton)
    .click(manageQuizzesButton);
});

test('can edit quizzes', async (t) => {
  await t
    .click(manageNavButton)
    .click(manageQuizzesButton)
    .click(amendQuizzesButton)
    .click(editQuizButton)
    .click(quizNameInput)
    .pressKey('ctrl+a delete')
    .typeText(quizNameInput, 'Animalis nomina')
    .click(quizDescriptionInput)
    .pressKey('ctrl+a delete')
    .typeText(quizDescriptionInput, 'Latina omnia et furry!')
    .click(Selector('#add-card-checkbox-1'))
    .click(confirmEditQuizButton)
    .expect(Selector('p').withText('Name: Animalis nomina').exists)
    .ok()
    .expect(Selector('p').withText('Description: Latina omnia et furry!').exists)
    .ok()
    .expect(cardOnePrompt.exists)
    .ok()
    .expect(cardTwoPrompt.exists)
    .ok()
    .click(studyNavButton)
    .expect(Selector('p').withText('Name: Animalis nomina').exists)
    .ok()
    .expect(Selector('p').withText('Description: Latina omnia et furry!').exists)
    .ok();
});

test('can delete quizzes', async (t) => {
  await t
    .click(manageNavButton)
    .click(manageQuizzesButton)
    .click(amendQuizzesButton)
    .expect(Selector('p').withText('Name: Animalis nomina').exists)
    .ok()
    .click(deleteQuizButton)
    .expect(deleteQuizButton.exists)
    .notOk()
    .expect(Selector('p').withText('Name: Animalis nomina').exists)
    .notOk()
    .expect(Selector('p').withText('No quizzes have been created.').exists)
    .ok()
    .click(studyNavButton)
    .expect(noQuizzesCreatedText.exists)
    .ok()
    .expect(Selector('p').withText('Name: Animalis nomina').exists)
    .notOk();
});
