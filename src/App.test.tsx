import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('app main component should', () => {
  it('render button and paint element on click or remove paint if already painted', () => {
    render(<App />);
    const button = document.querySelector('[data-testid=cell]');
    button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(button).toHaveClass('paint');
    button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(button).not.toHaveClass('paint');
  });

  it('render elements and match snapshot', () => {
    const result = render(<App />);
    const linkElement = result.getByText(/Generación/);
    expect(linkElement).toBeInTheDocument();
    expect(result).toMatchSnapshot();
  });
});
