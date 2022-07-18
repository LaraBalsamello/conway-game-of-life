import React from 'react';
import './styles.scss';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  text: string;
  testId: string;
}

const Button = ({ onClick, disabled = false, text, testId }: ButtonProps) => (
  <button
    className="action-buttons"
    type="button"
    onClick={onClick}
    disabled={disabled}
    data-testid={testId}
  >
    {text}
  </button>
);

export default Button;
