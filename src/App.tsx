import { useState } from 'react';
import '../public/scss/style.scss';
import {
  Container,
  Contents,
  Button,
  InputContainer,
  Input,
  TodoItem,
  TodoListContainer,
} from './Components';

const App = () => {
  const [toDo, setTodo] = useState<string>('');
  const [toDoList, setToDoList] = useState<string[]>([]);

  const handleAdd = () => setToDoList([...toDoList, toDo]);

  const handleDelete = (index: number) => {
    let list = [...toDoList];
    list.splice(index, 1);
    setToDoList(list);
  };

  return (
    <Container>
      <Contents>
        <TodoListContainer data-testid="toDoList">
          {toDoList.map((item, index) => (
            <TodoItem
              key={item}
              label={item}
              onDelete={() => handleDelete(index)}
            />
          ))}
        </TodoListContainer>

        <InputContainer>
          <Input
            placeholder="할 일을 입력해 주세요"
            value={toDo}
            onChange={setTodo}
          />
          <Button
            label="추가"
            backgroundColor="#86efac"
            hoverColor="#0891b2"
            onClick={handleAdd}
          />
        </InputContainer>
      </Contents>
    </Container>
  );
};

export default App;
