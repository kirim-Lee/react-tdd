import { fireEvent, render, screen } from '@testing-library/react';
import List from '../List';
import { TodoListProvider } from '../../Contexts/TodoList';
import {
  RouterProvider,
  createMemoryRouter,
  useLocation,
} from 'react-router-dom';

const TODO_LIST = 'TodoList';

describe('List Page', () => {
  it('렌더링 테스트', () => {
    const router = createMemoryRouter([{ path: '*', element: <List /> }]);

    localStorage.setItem(
      TODO_LIST,
      JSON.stringify(['Todo 1', 'Todo 2', 'Todo 3'])
    );

    const { container } = render(
      <TodoListProvider>
        <RouterProvider router={router} />
      </TodoListProvider>
    );

    const todoItem1 = screen.getByText('Todo 1');
    expect(todoItem1).toBeInTheDocument();
    expect(todoItem1.getAttribute('href')).toBe('/detail/0');

    const todoItem2 = screen.getByText('Todo 2');
    expect(todoItem2).toBeInTheDocument();
    expect(todoItem2.getAttribute('href')).toBe('/detail/1');

    const todoItem3 = screen.getByText('Todo 3');
    expect(todoItem3).toBeInTheDocument();
    expect(todoItem3.getAttribute('href')).toBe('/detail/2');

    expect(screen.getAllByText('삭제').length).toBe(3);

    const addButton = screen.getByText('+');
    expect(addButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('할일 삭제', () => {
    const router = createMemoryRouter([{ path: '*', element: <List /> }]);

    localStorage.setItem(
      TODO_LIST,
      JSON.stringify(['Todo 1', 'Todo 2', 'Todo 3'])
    );

    render(
      <TodoListProvider>
        <RouterProvider router={router} />
      </TodoListProvider>
    );

    const todoItem = screen.getByText('Todo 2');
    expect(todoItem).toBeInTheDocument();
    fireEvent.click(todoItem.nextElementSibling as HTMLElement);
    expect(todoItem).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(TODO_LIST))).not.toContain('Todo 2');
  });

  it('상세 페이지로 이동', () => {
    const TestComponent = () => {
      const { pathname } = useLocation();
      return (
        <>
          <div>{pathname}</div>
          <List />
        </>
      );
    };

    const router = createMemoryRouter([
      { path: '*', element: <TestComponent /> },
    ]);

    localStorage.setItem(
      TODO_LIST,
      JSON.stringify(['Todo 1', 'Todo 2', 'Todo 3'])
    );

    render(
      <TodoListProvider>
        <RouterProvider router={router} />
      </TodoListProvider>
    );

    const url = screen.getByText('/');
    expect(url).toBeInTheDocument();

    const todoItem1 = screen.getByText('Todo 2');
    expect(todoItem1.getAttribute('href')).toBe('/detail/1');
    fireEvent.click(todoItem1);

    expect(url.textContent).toBe('/detail/1');
  });

  it('생성 페이지로 이동', () => {
    const TestComponent = () => {
      const { pathname } = useLocation();
      return (
        <>
          <div>{pathname}</div>
          <List />
        </>
      );
    };

    const router = createMemoryRouter([
      { path: '*', element: <TestComponent /> },
    ]);

    localStorage.setItem(
      TODO_LIST,
      JSON.stringify(['Todo 1', 'Todo 2', 'Todo 3'])
    );

    render(
      <TodoListProvider>
        <RouterProvider router={router} />
      </TodoListProvider>
    );

    const url = screen.getByText('/');
    expect(url).toBeInTheDocument();

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    expect(url.textContent).toBe('/add');
  });
});
