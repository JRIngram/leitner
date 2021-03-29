import React from 'react'
import { render } from '@testing-library/react'
import  userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'
import { ColouredButton, ButtonType } from './ColouredButton';

describe('can render different button types', () => {
  describe('default button', () => {
    it('can render', () => {
      const { getByTestId } = render(<ColouredButton text='default button type' buttonType={ButtonType.default} onClickAction={ () => true } />)
      const testId = 'coloured-button-default-button-type';
      const expectedStyle = 'border: 2px solid #ccc; border-radius: 5px; font-size: 14px; padding: 8px 20px; margin: 5px 2px; cursor: pointer; background-color: rgb(204, 204, 204); color: rgb(0, 0, 0);'
      expect(getByTestId(testId)).toHaveTextContent('default button type');
      expect(getByTestId(testId)).toHaveStyle(expectedStyle);
    });

    it('has correct style when hovered and unhovered', () => {
      const { getByTestId } = render(<ColouredButton text='default button type' buttonType={ButtonType.default} onClickAction={ () => true } />)
      const testId = 'coloured-button-default-button-type';
      const expectedHoverStyle = 'border: 2px solid #666; border-radius: 5px; font-size: 14px; padding: 8px 20px; margin: 5px 2px; cursor: pointer; background-color: rgb(204, 204, 204); color: rgb(0, 0, 0);';
      const expectedUnhoverStyle = 'border: 2px solid #ccc; border-radius: 5px; font-size: 14px; padding: 8px 20px; margin: 5px 2px; cursor: pointer; background-color: rgb(204, 204, 204); color: rgb(0, 0, 0);';
      userEvent.hover(getByTestId(testId));
      expect(getByTestId(testId)).toHaveStyle(expectedHoverStyle);
      userEvent.unhover(getByTestId(testId));
      expect(getByTestId(testId)).toHaveStyle(expectedUnhoverStyle);
    });
  });

  describe('delete button', () => {
    it('can render', () => {
      const { getByTestId } = render(<ColouredButton text='delete button type' buttonType={ButtonType.delete} onClickAction={ () => true } />)
      const testId = 'coloured-button-delete-button-type';
      const expectedStyle = 'border: 2px solid #fbb; border-radius: 5px; font-size: 14px; padding: 8px 20px; margin: 5px 2px; cursor: pointer; background-color: rgb(255, 187, 187); color: rgb(170, 0, 0);'
      expect(getByTestId(testId)).toHaveTextContent('delete button type');
      expect(getByTestId(testId)).toHaveStyle(expectedStyle);
    });

    it('has correct style when hovered and unhovered', () => {
      const { getByTestId } = render(<ColouredButton text='delete button type' buttonType={ButtonType.delete} onClickAction={ () => true } />)
      const testId = 'coloured-button-delete-button-type';
      const expectedHoverStyle = 'border: 2px solid #f55; border-radius: 5px; font-size: 14px; padding: 8px 20px; margin: 5px 2px; cursor: pointer; background-color: rgb(255, 187, 187); color: rgb(170, 0, 0);';
      const expectedUnhoverStyle = 'border: 2px solid #fbb; border-radius: 5px; font-size: 14px; padding: 8px 20px; margin: 5px 2px; cursor: pointer; background-color: rgb(255, 187, 187); color: rgb(170, 0, 0);';
      userEvent.hover(getByTestId(testId));
      expect(getByTestId(testId)).toHaveStyle(expectedHoverStyle);
      userEvent.unhover(getByTestId(testId));
      expect(getByTestId(testId)).toHaveStyle(expectedUnhoverStyle);
    });
  });

  describe('add button', () => {
    it('can render', () => {
      const { getByTestId } = render(<ColouredButton text='add button type' buttonType={ButtonType.add} onClickAction={ () => true } />)
      const testId = 'coloured-button-add-button-type';
      const expectedStyle = 'border: 2px solid #9d9; border-radius: 5px; font-size: 14px; padding: 8px 20px; margin: 5px 2px; cursor: pointer; background-color: rgb(153, 221, 153); color: rgb(0, 85, 0);'
      expect(getByTestId(testId)).toHaveTextContent('add button type');
      expect(getByTestId(testId)).toHaveStyle(expectedStyle);
    });
  
    it('has correct style when hovered and unhovered', () => {
      const { getByTestId } = render(<ColouredButton text='add button type' buttonType={ButtonType.add} onClickAction={ () => true } />)
      const testId = 'coloured-button-add-button-type';
      const expectedHoverStyle = 'border: 2px solid #6a6; border-radius: 5px; font-size: 14px; padding: 8px 20px; margin: 5px 2px; cursor: pointer; background-color: rgb(153, 221, 153); color: rgb(0, 85, 0);';
      const expectedUnhoverStyle = 'border: 2px solid #9d9; border-radius: 5px; font-size: 14px; padding: 8px 20px; margin: 5px 2px; cursor: pointer; background-color: rgb(153, 221, 153); color: rgb(0, 85, 0);';
      userEvent.hover(getByTestId(testId));
      expect(getByTestId(testId)).toHaveStyle(expectedHoverStyle);
      userEvent.unhover(getByTestId(testId));
      expect(getByTestId(testId)).toHaveStyle(expectedUnhoverStyle);
    });
  });

  
  describe('nav button', () => {
    it('can render', () => {
      const { getByTestId } = render(<ColouredButton text='nav button type' buttonType={ButtonType.nav} onClickAction={ () => true } />)
      const testId = 'coloured-button-nav-button-type';
      const expectedStyle = 'border: 2px solid #78b3f7; border-radius: 5px; font-size: 14px; padding: 8px 20px; margin: 5px 2px; cursor: pointer; background-color: rgb(120, 179, 247); color: rgb(9, 77, 155);'
      expect(getByTestId(testId)).toHaveTextContent('nav button type');
      expect(getByTestId(testId)).toHaveStyle(expectedStyle);
    });
  
    it('has correct style when hovered and unhovered', () => {
      const { getByTestId } = render(<ColouredButton text='nav button type' buttonType={ButtonType.nav} onClickAction={ () => true } />)
      const testId = 'coloured-button-nav-button-type';
      const expectedHoverStyle = 'border: 2px solid #094d9b; border-radius: 5px; font-size: 14px; padding: 8px 20px; margin: 5px 2px; cursor: pointer; background-color: rgb(120, 179, 247); color: rgb(9, 77, 155);'
      const expectedUnhoverStyle = 'border: 2px solid #78b3f7; border-radius: 5px; font-size: 14px; padding: 8px 20px; margin: 5px 2px; cursor: pointer; background-color: rgb(120, 179, 247); color: rgb(9, 77, 155);'
      userEvent.hover(getByTestId(testId));
      expect(getByTestId(testId)).toHaveStyle(expectedHoverStyle);
      userEvent.unhover(getByTestId(testId));
      expect(getByTestId(testId)).toHaveStyle(expectedUnhoverStyle);
    });
  });

  describe('navFilled button', () => {
    it('can render', () => {
      const { getByTestId } = render(<ColouredButton text='nav filled button type' buttonType={ButtonType.navFilled} onClickAction={ () => true } />)
      const testId = 'coloured-button-nav-filled-button-type';
      const expectedStyle = 'border: 2px solid #094d9b; border-radius: 5px; font-size: 14px; padding: 8px 20px; margin: 5px 2px; cursor: pointer; background-color: rgb(9, 77, 155); color: rgb(255, 255, 255);'
      expect(getByTestId(testId)).toHaveTextContent('nav filled button type');
      expect(getByTestId(testId)).toHaveStyle(expectedStyle);
    });
  
    it('has correct style when hovered and unhovered', () => {
      const { getByTestId } = render(<ColouredButton text='nav filled button type' buttonType={ButtonType.navFilled} onClickAction={ () => true } />)
      const testId = 'coloured-button-nav-filled-button-type';
      const expectedHoverStyle = 'border: 2px solid #094d9b; border-radius: 5px; font-size: 14px; padding: 8px 20px; margin: 5px 2px; cursor: pointer; background-color: rgb(120, 179, 247); color: rgb(9, 77, 155);'
      const expectedUnhoverStyle = 'border: 2px solid #094d9b; border-radius: 5px; font-size: 14px; padding: 8px 20px; margin: 5px 2px; cursor: pointer; background-color: rgb(9, 77, 155); color: rgb(255, 255, 255);'
      userEvent.hover(getByTestId(testId));
      expect(getByTestId(testId)).toHaveStyle(expectedHoverStyle);
      userEvent.unhover(getByTestId(testId));
      expect(getByTestId(testId)).toHaveStyle(expectedUnhoverStyle);
    });
  });

  it('Returns value from onClickAction', () => {
    const clickCallback = jest.fn();
    const { getByTestId } = render(<ColouredButton text='on click action test' buttonType={ButtonType.default} onClickAction={ () => { clickCallback() }} />);
    const testId = 'coloured-button-on-click-action-test';
    expect(clickCallback).not.toBeCalled();
    userEvent.click(getByTestId(testId));
    expect(clickCallback).toBeCalled();
  });
});