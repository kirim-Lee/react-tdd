import { fireEvent, render, screen } from '@testing-library/react';
import { TodoListProvider } from '../../Contexts/TodoList';
import { TodoList } from '../TodoList';
import { MemoryRouter, useLocation } from 'react-router-dom';

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
        <MemoryRouter>
          <TodoList />
        </MemoryRouter>
      </TodoListProvider>
    );

    expect(screen.getByText('todo 1')).toBeInTheDocument();
    expect(screen.getByText('todo 2')).toBeInTheDocument();
    expect(screen.getByText('todo 3')).toBeInTheDocument();

    expect(screen.getByText('todo 1').getAttribute('href')).toBe('/detail/0');
    expect(screen.getByText('todo 2').getAttribute('href')).toBe('/detail/1');
    expect(screen.getByText('todo 3').getAttribute('href')).toBe('/detail/2');

    expect(screen.getAllByText('삭제').length).toBe(3);
  });

  it('todoList 삭제 연동 테스트', () => {
    localStorage.setItem(
      TODO_LIST,
      JSON.stringify(['todo 1', 'todo 2', 'todo 3'])
    );

    render(
      <TodoListProvider>
        <MemoryRouter>
          <TodoList />
        </MemoryRouter>
      </TodoListProvider>
    );

    const todoItem = screen.getByText('todo 2');
    expect(todoItem).toBeInTheDocument();

    fireEvent.click(todoItem.nextElementSibling);
    expect(todoItem).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(TODO_LIST))).not.toContain('todo 2');
  });

  it('목록 클릭시 페이지 이동 체크', () => {
    localStorage.setItem(
      TODO_LIST,
      JSON.stringify(['todo 1', 'todo 2', 'todo 3'])
    );

    const TestComponent = () => {
      const location = useLocation();
      return (
        <div>
          <div>{location.pathname}</div>
        </div>
      );
    };

    render(
      <TodoListProvider>
        <MemoryRouter>
          <TestComponent />
          <TodoList />
        </MemoryRouter>
      </TodoListProvider>
    );

    const url = screen.getByText('/');
    expect(url).toBeInTheDocument();

    const todoItem = screen.getByText('todo 2');
    expect(todoItem.getAttribute('href')).toBe('/detail/1');

    fireEvent.click(todoItem);
    expect(url.textContent).toBe('/detail/1');
  });
});
