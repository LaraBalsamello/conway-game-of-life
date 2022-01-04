import React from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  text: string;
}

const Button = ({ onClick, disabled = false, text }: ButtonProps) => (
  <button type="button" onClick={onClick} disabled={disabled}>
    {text}
  </button>
);

export default Button;
