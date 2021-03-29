import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ManageQuizzesCardListItem from './ManageQuizzesCardListItem';
import userEvent from '@testing-library/user-event';

describe('ManageQuizzesCardListItem rendering', () => {
  const id = '123456789012';
  const testId = `manage-quiz-card-list-item-${id}`;
  const prompt = 'I am a test prompt';
  const answer = 'I am a test answer';

  it('renders correctly on original render', () => {
    const { getByTestId } = render(
      <ManageQuizzesCardListItem 
        id={id}
        prompt={prompt}
        answer={answer}
        handleCheckChange={() => true}
      />
    );
    expect(getByTestId(testId)).toBeVisible();
    expect(getByTestId(`${testId}-checkbox-label`)).toBeVisible();
    expect(getByTestId(`${testId}-checkbox-false`)).toBeVisible();
    expect(getByTestId(`${testId}-prompt`)).toBeVisible();
    expect(getByTestId(`${testId}-answer`)).toBeVisible();
  });

  it('renders correctly when checkbox is checked', () => {
    const { getByTestId } = render(
      <ManageQuizzesCardListItem 
        id={id}
        prompt={prompt}
        answer={answer}
        handleCheckChange={() => true}
      />
    );
    fireEvent.click(getByTestId(`${testId}-checkbox-false`));
    expect(getByTestId(`${testId}-checkbox-label`)).toBeVisible();
    expect(getByTestId(`${testId}-checkbox-true`)).toBeVisible();
    expect(getByTestId(`${testId}-prompt`)).toBeVisible();
    expect(getByTestId(`${testId}-answer`)).toBeVisible();
  });

  it('renders correctly when checkbox is unchecked', () => {
    const { getByTestId } = render(
      <ManageQuizzesCardListItem 
        id={id}
        prompt={prompt}
        answer={answer}
        handleCheckChange={() => true}
      />
    );
    fireEvent.click(getByTestId(`${testId}-checkbox-false`));
    fireEvent.click(getByTestId(`${testId}-checkbox-true`));
    expect(getByTestId(`${testId}-checkbox-label`)).toBeVisible();
    expect(getByTestId(`${testId}-checkbox-false`)).toBeVisible();
    expect(getByTestId(`${testId}-prompt`)).toBeVisible();
    expect(getByTestId(`${testId}-answer`)).toBeVisible();
  });
});

describe('handleCheckChange callback', () => {
  it('handleCheckChange callback is triggered when checking checkbox', () => {
    const spyCallback = jest.fn();
    const uncheckedTestId = 'manage-quiz-card-list-item-123456789012-checkbox-false';
    const { getByTestId } = render(<ManageQuizzesCardListItem 
      id={'123456789012'}
      prompt={'prompt'}
      answer={'answer'}
      handleCheckChange={() => spyCallback()}
    />);
    fireEvent.click(getByTestId(uncheckedTestId));
    expect(spyCallback).toHaveBeenCalled();
  });

  it('handleCheckChange callback is triggered when unchecking checkbox', () => {
    const spyCallback = jest.fn();
    const uncheckedTestId = 'manage-quiz-card-list-item-123456789012-checkbox-false';
    const checkedTestId = 'manage-quiz-card-list-item-123456789012-checkbox-true';
    const { getByTestId } = render(<ManageQuizzesCardListItem 
      id={'123456789012'}
      prompt={'prompt'}
      answer={'answer'}
      handleCheckChange={() => spyCallback()}
    />);
    fireEvent.click(getByTestId(uncheckedTestId));
    expect(spyCallback).toHaveBeenCalled();
    fireEvent.click(getByTestId(checkedTestId));
    expect(spyCallback).toHaveBeenCalledTimes(2);
  });
})