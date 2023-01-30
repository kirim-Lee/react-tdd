import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { TodoItem } from './TodoItem';
import { TodoListContext } from '../Contexts/TodoList';

const Container = styled.div`
  min-width: 350px;
  height: 400px;
  overflow-y: scroll;
  border: 1px solid #bdbdbd;
`;

export const TodoList = () => {
  const { todoList, deleteTodo } = useContext(TodoListContext);

  return (
    <Container data-testid="toDoList">
      {todoList.map((item, index) => (
        <TodoItem
          key={item}
          id={index}
          label={item}
          onDelete={() => deleteTodo(index)}
        />
      ))}
    </Container>
  );
};
