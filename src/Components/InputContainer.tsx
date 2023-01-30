import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Input } from './Input';
import { Button } from './Button';
import { TodoListContext } from '../Contexts/TodoList';

const Container = styled.div`
  display: flex;
`;

interface IProps {
  readonly onAdd?: () => void;
}

export const InputContainer = ({ onAdd }: IProps) => {
  const { addTodo } = useContext(TodoListContext);
  const [todo, setTodo] = useState<string>('');

  const handleAdd = () => {
    addTodo(todo);
    setTodo('');
    if (todo && onAdd) onAdd();
  };

  return (
    <Container>
      <Input
        placeholder="할 일을 입력해 주세요"
        value={todo}
        onChange={setTodo}
      />
      <Button label="추가" onClick={handleAdd} />
    </Container>
  );
};
