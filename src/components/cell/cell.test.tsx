import React from 'react';
import { render } from '@testing-library/react';
import Cell from './cell';

describe('cell component should', () => {
  it('render and not be painted', () => {
    const mockFunction = jest.fn();
    render(<Cell paintElement={false} onClickHandler={mockFunction} />);
    const button = document.querySelector('[data-testid=cell]');
    expect(button).not.toHaveClass('paint');
  });

  it('render and painted', () => {
    const mockFunction = jest.fn();
    render(<Cell paintElement onClickHandler={mockFunction} />);
    const button = document.querySelector('[data-testid=cell]');
    expect(button).toHaveClass('paint');
  });
  it('render and call mock function on click', () => {
    const mockFunction = jest.fn();
    render(<Cell paintElement onClickHandler={mockFunction} />);
    const button = document.querySelector('[data-testid=cell]');
    button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(mockFunction).toHaveBeenCalled();
  });
});
