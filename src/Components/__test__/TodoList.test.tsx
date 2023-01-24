import { fireEvent, render, screen } from '@testing-library/react';
import { TodoListProvider } from '../../Contexts/TodoList';
import { TodoList } from '../TodoList';

const TODO_LIST = 'TodoList';

beforeEach(() => {
  localStorage.clear();
});

describe('<TodoList />', () => {
  it('렌더링 테스트', () => {
    const { container } = render(
      <TodoListProvider>
        <TodoList />
      </TodoListProvider>
    );

    const todoList = screen.getByTestId('toDoList');
    expect(todoList).toBeInTheDocument();
    expect(todoList.firstChild).toBeNull();

    expect(container).toMatchSnapshot();
  });

  it('todoList 존재할 경우 노출', () => {
    localStorage.setItem(
      TODO_LIST,
      JSON.stringify(['todo 1', 'todo 2', 'todo 3'])
    );

    render(
      <TodoListProvider>
        <TodoList />
      </TodoListProvider>
    );

    expect(screen.getByText('todo 1')).toBeInTheDocument();
    expect(screen.getByText('todo 2')).toBeInTheDocument();
    expect(screen.getByText('todo 3')).toBeInTheDocument();
    expect(screen.getAllByText('삭제').length).toBe(3);
  });

  it('todoList 삭제 연동 테스트', () => {
    localStorage.setItem(
      TODO_LIST,
      JSON.stringify(['todo 1', 'todo 2', 'todo 3'])
    );

    render(
      <TodoListProvider>
        <TodoList />
      </TodoListProvider>
    );

    const todoItem = screen.getByText('todo 2');
    expect(todoItem).toBeInTheDocument();

    fireEvent.click(todoItem.nextElementSibling);
    expect(todoItem).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(TODO_LIST))).not.toContain('todo 2');
  });
});
