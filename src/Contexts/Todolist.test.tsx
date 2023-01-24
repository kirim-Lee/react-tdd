import { fireEvent, render, screen } from '@testing-library/react';
import { TodoListContext, TodoListProvider } from './TodoList';
import { useContext } from 'react';

const TODO_LIST = 'TodoList';

beforeEach(() => {
  localStorage.clear();
});

describe('TodoList Context', () => {
  it('렌더링 테스트', () => {
    const ChildComponent = () => {
      return <div>Child Compoenent</div>;
    };

    render(
      <TodoListProvider>
        <ChildComponent />
      </TodoListProvider>
    );

    const childComponent = screen.getByText('Child Compoenent');
    expect(childComponent).toBeInTheDocument();
    expect(localStorage.getItem(TODO_LIST)).toBeNull();
  });

  it('로딩시 localStrage의 데이터를 컨텍스트 state으로 잘 가져오는지 확인', () => {
    localStorage.setItem(
      TODO_LIST,
      JSON.stringify(['Todo 1', 'Todo 2', 'Todo 3'])
    );

    const ChildComponent = () => {
      const { todoList } = useContext(TodoListContext);
      return (
        <div>
          {todoList.map((todo) => (
            <div key={todo}>{todo}</div>
          ))}
        </div>
      );
    };

    render(
      <TodoListProvider>
        <ChildComponent />
      </TodoListProvider>
    );

    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
    expect(screen.getByText('Todo 3')).toBeInTheDocument();
  });

  it('컨텍스트의 addTodo', () => {
    const ChildComponent = () => {
      const { todoList, addTodo } = useContext(TodoListContext);
      return (
        <div>
          <div onClick={() => addTodo('study react 1')}>Add Todo</div>
          <div>
            {todoList.map((todo) => (
              <div key={todo}>{todo}</div>
            ))}
          </div>
        </div>
      );
    };

    render(
      <TodoListProvider>
        <ChildComponent />
      </TodoListProvider>
    );

    expect(localStorage.getItem(TODO_LIST)).toBeNull();

    const button = screen.getByText('Add Todo');
    fireEvent.click(button);
    expect(screen.getByText('study react 1')).toBeInTheDocument();
    expect(localStorage.getItem(TODO_LIST)).toBe(
      JSON.stringify(['study react 1'])
    );
  });

  it('컨텍스트의 addTodo 값이 없을 경우 return', () => {
    const ChildComponent = () => {
      const { todoList, addTodo } = useContext(TodoListContext);
      return (
        <div>
          <div onClick={() => addTodo('')}>Add Todo</div>
          <div data-testid="todoList">
            {todoList.map((todo) => (
              <div key={todo}>{todo}</div>
            ))}
          </div>
        </div>
      );
    };

    render(
      <TodoListProvider>
        <ChildComponent />
      </TodoListProvider>
    );

    expect(localStorage.getItem(TODO_LIST)).toBeNull();

    const button = screen.getByText('Add Todo');
    fireEvent.click(button);
    expect(localStorage.getItem(TODO_LIST)).toBeNull();
    expect(screen.getByTestId('todoList').childNodes.length).toBe(0);
  });

  it('컨텍스트의 deleteTodo', () => {
    localStorage.setItem(
      TODO_LIST,
      JSON.stringify(['Todo 1', 'Todo 2', 'Todo 3'])
    );

    const ChildComponent = () => {
      const { todoList, deleteTodo } = useContext(TodoListContext);
      return (
        <div>
          <div>
            {todoList.map((todo, index) => (
              <div key={todo} onClick={() => deleteTodo(index)}>
                {todo}
              </div>
            ))}
          </div>
        </div>
      );
    };

    render(
      <TodoListProvider>
        <ChildComponent />
      </TodoListProvider>
    );

    const toDoItem = screen.getByText('Todo 2');
    expect(toDoItem).toBeInTheDocument();

    fireEvent.click(toDoItem);
    expect(toDoItem).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(TODO_LIST))).not.toContain('Todo 2');
  });
});
