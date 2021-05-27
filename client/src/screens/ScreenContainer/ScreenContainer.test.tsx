import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ScreenContainer from './ScreenContainer';

describe('ScreenContainer', () => {
  describe('navbar', () => {
    it('renders correctly on initial render', () => {
      const { getByText, getByTestId } = render(<ScreenContainer />);
      expect(getByText('Leitner')).toBeVisible();
      expect(getByTestId('navbar-item-0')).toBeVisible();
      expect(getByText('Manage')).toBeVisible();
      expect(getByText('Study using your created flashcards and quizzes.')).toBeVisible();
    });

    it('render correctly if user clicks on Manage', async () => {
      const { getByText, findByText, getByTestId} = render(<ScreenContainer />);
      fireEvent.click(getByText('Manage'));
      expect(await findByText('Manage your cards and quizzes')).toBeVisible();
      expect(getByText('Leitner')).toBeVisible();
      expect(getByText('Study')).toBeVisible();
      expect(getByTestId('navbar-item-1')).toBeVisible();
    });

    it('renders correctly after clicking Manage and then Quizzes', async () => {
      const { getByText, findByText, getByTestId } = render(<ScreenContainer />);
      fireEvent.click(getByText('Manage'));
      expect(await findByText('Manage your cards and quizzes')).toBeVisible();
      fireEvent.click(getByText('Study'));
      expect(await findByText('Study using your created flashcards and quizzes.')).toBeVisible();
      expect(getByText('Leitner')).toBeVisible();
      expect(getByTestId('navbar-item-0')).toBeVisible();
      expect(getByText('Manage')).toBeVisible();
    });
  });
})