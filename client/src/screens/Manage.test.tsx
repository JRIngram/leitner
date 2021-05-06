import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Manage from './Manage';

describe('Manage', () => {
  it('renders default state correctly', () => {
    const { getByText, getByTestId, queryByTestId } = render(<Manage />);
    const header = getByText('Manage');
    const subheading = getByText('Manage your cards and quizzes');
    const manageCardsButton = getByText('Manage Cards');
    const manageQuizzesButton = getByText('Manage Quizzes');
    const manageCardsScreen = getByTestId('manage-cards');
    const manageQuizzesScreen = queryByTestId('manage-quizzes');
    expect(header).toBeVisible();
    expect(subheading).toBeVisible();
    expect(manageCardsButton).toBeVisible();
    expect(manageQuizzesButton).toBeVisible();
    expect(manageCardsScreen).toBeVisible();
    expect(manageQuizzesScreen).toBeNull();
  });

  it('renders correctly when displaying Manage Quizzes', async () => {
    const { getByText, queryByTestId, getByTestId, findByTestId } = render(<Manage />);
    const header = getByText('Manage');
    const subheading = getByText('Manage your cards and quizzes');
    const manageCardsButton = getByText('Manage Cards');
    const manageQuizzesButton = getByText('Manage Quizzes');
    fireEvent.click(manageQuizzesButton);
    await waitFor(() => {
      expect(getByTestId('add-quiz')).toBeVisible();
    })
    const manageQuizzesScreen = await findByTestId('manage-quizzes');
    const manageCardsScreen = queryByTestId('manage-cards');
    expect(header).toBeVisible();
    expect(subheading).toBeVisible();
    expect(manageCardsButton).toBeVisible();
    expect(manageQuizzesButton).toBeVisible();
    expect(manageCardsScreen).toBeNull();
    expect(manageQuizzesScreen).toBeVisible();
  });
});
