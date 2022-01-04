import React from 'react';
import './styles.scss';

interface InputProps {
  text: string;
  value: number;
  onChange: ({ target: { value } }: { target: { value: string } }) => void;
}

const Input = ({ text, value, onChange }: InputProps) => (
  <div className="input-container">
    <label>{text}</label>
    <input type="number" value={value} onChange={onChange} />
  </div>
);

export default Input;
