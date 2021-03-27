import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Divider from './Divider';

describe('Divider', () => {
  it('renders with the correct style', () => {
    const {getByTestId} = render(<Divider />);
    const testId = 'divider';
    expect(getByTestId(testId)).toBeVisible();
    expect(getByTestId(testId)).toHaveStyle('borderStyle: solid');
    expect(getByTestId(testId)).toHaveStyle('borderTopWidth: 1px');
    expect(getByTestId(testId)).toHaveStyle('borderBottomWidth: 1px');
  })
});
