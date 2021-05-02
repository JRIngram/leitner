import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { CardForm, CardFormType} from './CardForm';

const formTestId = 'card-form';
const promptLabelId = 'card-form-prompt-label'
const promptInputId = 'card-form-prompt-input';
const answerLabelId = 'card-form-answer-label'
const answerInputId = 'card-form-prompt-input';
const cancelCardButtonId = 'coloured-button-cancel';

describe('add card form type', () => {
  const formType = CardFormType.add;
  const addCardButtonId = 'coloured-button-add-card';

  it('renders correctly', () => {
    const {getByTestId} = render(
      <CardForm 
        formType={formType}
        onCancel={() => 'cancelled'}
        afterGreenButtonClick={() => 'green button clicked'}
      />
    );
    expect(getByTestId(formTestId)).toBeVisible();
    expect(getByTestId(promptLabelId)).toBeVisible();
    expect(getByTestId(promptInputId)).toBeVisible();
    expect(getByTestId(answerLabelId)).toBeVisible();
    expect(getByTestId(answerInputId)).toBeVisible();
    expect(getByTestId(addCardButtonId)).toBeVisible();
    expect(getByTestId(cancelCardButtonId)).toBeVisible();
  });
});

describe('edit card form type', () => {
  const formType = CardFormType.edit;
  const editCardButtonId = 'coloured-button-edit-card';

  it('renders correctly', () => {
    const {getByTestId} = render(
      <CardForm 
        formType={formType}
        onCancel={() => 'cancelled'}
        afterGreenButtonClick={() => 'green button clicked'}
      />
    );
    expect(getByTestId(formTestId)).toBeVisible();
    expect(getByTestId(promptLabelId)).toBeVisible();
    expect(getByTestId(promptInputId)).toBeVisible();
    expect(getByTestId(answerLabelId)).toBeVisible();
    expect(getByTestId(answerInputId)).toBeVisible();
    expect(getByTestId(editCardButtonId)).toBeVisible();
    expect(getByTestId(cancelCardButtonId)).toBeVisible();
  });
});