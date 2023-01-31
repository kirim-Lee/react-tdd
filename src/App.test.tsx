import { fireEvent, render, screen } from '@testing-library/react';
import App, { routes } from './App';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { TodoListProvider } from './Contexts/TodoList';

const TODO_LIST = 'TodoList';

describe('<App />', () => {
  it('렌더링이 잘 되는지 테스트', () => {
    const router = createMemoryRouter(routes);

    const { container } = render(
      <TodoListProvider>
        <RouterProvider router={router} />
      </TodoListProvider>
    );

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
    expect(toDoList.firstChild).toBeNull();

    const input = screen.getByText('할 일 목록');
    expect(input).toBeInTheDocument();
    const button = screen.getByText('+');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('추가 페이지 이동, 돌아오기 확인', () => {
    const router = createMemoryRouter(routes);

    const { container } = render(
      <TodoListProvider>
        <RouterProvider router={router} />
      </TodoListProvider>
    );

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    const header = screen.getByText('할 일 추가');
    expect(header).toBeInTheDocument();

    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeInTheDocument();

    const button = screen.getByText('추가');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();

    fireEvent.click(goBack);
    expect(header.textContent).toBe('할 일 목록');

    const todoList = screen.getByTestId('toDoList');
    expect(todoList).toBeInTheDocument();
  });

  it('상세 페이지로 이동, 다시 되돌아오기', () => {
    localStorage.setItem(TODO_LIST, JSON.stringify(['ToDo 1']));

    const router = createMemoryRouter(routes);

    const { container } = render(
      <TodoListProvider>
        <RouterProvider router={router} />
      </TodoListProvider>
    );

    const todoItem = screen.getByText('ToDo 1');
    expect(todoItem).toBeInTheDocument();

    fireEvent.click(todoItem);

    const header = screen.getByText('할 일 상세');
    expect(header).toBeInTheDocument();
    const goBack = screen.getByText('돌아가기');
    expect(goBack).toBeInTheDocument();
    const todo = screen.getByText('ToDo 1');
    expect(todo).toBeInTheDocument();
    const button = screen.getByText('삭제');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();

    fireEvent.click(goBack);
    expect(header.textContent).toBe('할 일 목록');
    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
  });

  it('할 일 추가 시 리스트로 돌아가서 목록에 잘 추가되는 지 확인', () => {
    const router = createMemoryRouter(routes);

    render(
      <TodoListProvider>
        <RouterProvider router={router} />
      </TodoListProvider>
    );

    const addButton = screen.getByText('+');
    fireEvent.click(addButton);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    const button = screen.getByText('추가');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(button);

    const header = screen.getByText('할 일 목록');
    expect(header).toBeInTheDocument();
    const newTodo = screen.getByText('New Todo');
    expect(newTodo).toBeInTheDocument();
  });

  it('할일 삭제시 잘 삭제되는지 확인', () => {
    localStorage.setItem(TODO_LIST, JSON.stringify(['ToDo 1']));

    const router = createMemoryRouter(routes);

    render(
      <TodoListProvider>
        <RouterProvider router={router} />
      </TodoListProvider>
    );

    const todoItem = screen.getByText('ToDo 1');
    const deleteButton = screen.getByText('삭제');
    expect(todoItem).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(todoItem).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
    expect(localStorage.getItem(TODO_LIST)).toBe('[]');
  });

  it('상세페이지에서 할일 삭제시 잘 삭제되는지와 목록으로 이동되는지 확인', () => {
    localStorage.setItem(TODO_LIST, JSON.stringify(['ToDo 1']));

    const router = createMemoryRouter(routes);

    render(
      <TodoListProvider>
        <RouterProvider router={router} />
      </TodoListProvider>
    );

    const todoItem = screen.getByText('ToDo 1');
    expect(todoItem).toBeInTheDocument();

    fireEvent.click(todoItem);

    const header = screen.getByText('할 일 상세');
    expect(header).toBeInTheDocument();

    const deleteButton = screen.getByText('삭제');
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);

    expect(header.textContent).toBe('할 일 목록');
    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
  });
});
