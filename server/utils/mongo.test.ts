import {
  addCard, getAllCards, updateCard, deleteCard,
} from './mongo';

describe('functions are defined', () => {
  it('getAllCards', () => {
    expect(getAllCards).toBeDefined();
  });

  it('addCard', () => {
    expect(addCard).toBeDefined();
  });

  it('updateCard', () => {
    expect(updateCard).toBeDefined();
  });

  it('deleteCard', () => {
    expect(deleteCard).toBeDefined();
  });
});

// it('can add card', async () => {
//   const expectedString = 'Added card with {"prompt": "test prompt", "answer": "test answer"}';
//   const returnedString = await addCard('test prompt', 'test answer');
//   expect(returnedString).toEqual(expectedString);
// });
