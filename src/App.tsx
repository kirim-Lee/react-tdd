import { useState } from 'react';
import '../public/scss/style.scss';
import { Container, Contents, InputContainer, TodoList } from './Components';
import { TodoListProvider } from './Contexts/TodoList';

const App = () => {
  return (
    <TodoListProvider>
      <Container>
        <Contents>
          <TodoList />
          <InputContainer />
        </Contents>
      </Container>
    </TodoListProvider>
  );
};

export default App;
