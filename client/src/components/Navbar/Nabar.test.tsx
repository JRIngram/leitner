import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NavBar from './Navbar';

describe('navbar', () => {
  it('renders with correct links', () => {
    const {getByText} = render(<NavBar />)
    const navBarTitle = getByText('Leitner');
    const quizLink = getByText('Quizzes');
    const manageLink = getByText('Manage');
    expect(navBarTitle).toBeVisible();
    expect(manageLink).toBeVisible();
    expect(manageLink).toContainHTML('<a href=""');
    expect(quizLink).toBeVisible();
    expect(quizLink).toContainHTML('<a href=""');
  })
})