import React from 'react';
import { render } from '@testing-library/react';
import Input from './input';

describe('cell component should', () => {
  it('render', () => {
    const mockFunction = jest.fn();
    render(
      <Input onChange={() => mockFunction} text="this is a text" value={2} />,
    );
    const input = document.querySelector('[data-testid=container-input]');
    expect(input).toMatchSnapshot();
  });
});
