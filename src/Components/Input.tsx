import React from 'react';
import styled from 'styled-components';

const InputBox = styled.input`
  flex: 1;
  font-size: 16px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #bdbdbd;
  outline: none;
`;

interface IProps {
  readonly placeholder?: string;
  readonly onChange?: (text: string) => void;
}

export const Input = ({ placeholder, onChange }: IProps) => {
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(evt.target.value);
  };

  return <InputBox placeholder={placeholder} onChange={handleChange} />;
};
