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
    const { getByText, queryByTestId, findByTestId } = render(<Manage />);
    const header = getByText('Manage');
    const subheading = getByText('Manage your cards and quizzes');
    const manageCardsButton = getByText('Manage Cards');
    const manageQuizzesButton = getByText('Manage Quizzes');
    fireEvent.click(manageQuizzesButton);
    await waitFor(() => {
      expect(getByText('add quiz')).toBeVisible();
    });
    const manageQuizzesScreen = await findByTestId('manage-quizzes');
    const manageCardsScreen = queryByTestId('manage-cards');
    expect(header).toBeVisible();
    expect(subheading).toBeVisible();
    expect(manageCardsButton).toBeVisible();
    expect(manageQuizzesButton).toBeVisible();
    expect(manageCardsScreen).toBeNull();
    expect(manageQuizzesScreen).toBeVisible();
  });

  it('renders correctly when displaying Manage Quizzes and then displaying Manage Cards', async () => {
    const { getByText, findByText } = render(<Manage />);
    const manageCardsButton = getByText('Manage Cards');
    const manageQuizzesButton = getByText('Manage Quizzes');
    fireEvent.click(manageQuizzesButton);
    expect(await findByText('add quiz')).toBeVisible();
    fireEvent.click(manageCardsButton);
    expect(await findByText('add cards')).toBeVisible();
  });

  it('stays in manage cards mode when clicking manage card button', async () => {
    const { getByText, findByText } = render(<Manage />);
    const manageCardsButton = getByText('Manage Cards');
    fireEvent.click(manageCardsButton);
    expect(await findByText('add cards')).toBeVisible();
  });

  it('stays in manage quizzes mode when clicking manage quizzes button', async () => {
    const { getByText, findByText } = render(<Manage />);
    const manageQuizzesButton = getByText('Manage Quizzes');
    fireEvent.click(manageQuizzesButton);
    expect(await findByText('add quiz')).toBeVisible();
    fireEvent.click(manageQuizzesButton);
    expect(await findByText('add quiz')).toBeVisible();
  });
});
