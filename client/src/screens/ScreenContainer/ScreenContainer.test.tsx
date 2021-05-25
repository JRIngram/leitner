import React from 'react';
import { render, fireEvent, waitFor, findByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ScreenContainer from './ScreenContainer';

describe('ScreenContainer', () => {
  describe('navbar', () => {
    it('renders correctly on initial render', () => {
      const { getByText } = render(<ScreenContainer />);
      expect(getByText('Leitner')).toBeVisible();
      expect(getByText('Quizzes')).toBeVisible();
      expect(getByText('Manage')).toBeVisible();
      expect(getByText('TODO: add quizzes screen')).toBeVisible();
    });

    it('render correctly if user clicks on Manage', async () => {
      const { getByText, findByText, queryAllByText } = render(<ScreenContainer />);
      fireEvent.click(getByText('Manage'));
      expect(await findByText('Manage your cards and quizzes')).toBeVisible();
      expect(getByText('Leitner')).toBeVisible();
      expect(getByText('Quizzes')).toBeVisible();
      expect(queryAllByText('Manage').length).toEqual(2);
    });

    it('renders correctly after clicking Manage and then Quizzes', async () => {
      const { getByText, findByText } = render(<ScreenContainer />);
      fireEvent.click(getByText('Manage'));
      expect(await findByText('Manage your cards and quizzes')).toBeVisible();
      fireEvent.click(getByText('Quizzes'));
      expect(await findByText('TODO: add quizzes screen')).toBeVisible();
    });
  });
})