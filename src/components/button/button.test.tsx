import React from 'react';
import { render } from '@testing-library/react';
import Button from './button';

describe('button component should', () => {
  it('render and call mock function on click', () => {
    const mockFunction = jest.fn();
    render(
      <Button
        text="This is a button"
        testId="this-test-id-button"
        disabled={false}
        onClick={mockFunction}
      />,
    );
    const button = document.querySelector('[data-testid=this-test-id-button]');
    button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(mockFunction).toHaveBeenCalled();
  });

  it('render correctly', () => {
    const mockFunction = jest.fn();
    const result = render(
      <Button
        text="This is a button"
        testId="this-test-id-button"
        disabled={false}
        onClick={mockFunction}
      />,
    );
    const button = document.querySelector('[data-testid=this-test-id-button]');
    expect(button).not.toStrictEqual(null);
    expect(result).toMatchSnapshot();
  });
});
