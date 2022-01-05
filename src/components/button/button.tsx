import React from 'react';
import './styles.scss';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  text: string;
}

const Button = ({ onClick, disabled = false, text }: ButtonProps) => (
  <button
    className="action-buttons"
    type="button"
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default Button;
