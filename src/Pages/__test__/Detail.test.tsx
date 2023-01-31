import {
  MemoryRouter,
  Route,
  RouterProvider,
  Routes,
  createMemoryRouter,
  useLocation,
} from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { TodoListProvider } from '../../Contexts/TodoList';
import Detail from '../Detail';

const TODO_LIST = 'TodoList';

beforeEach(() => {
  localStorage.clear();
});

describe('Detail page', () => {
  it('렌더링 테스트', () => {
    const router = createMemoryRouter(
      [{ path: '/detail/:id', element: <Detail /> }],
      { initialEntries: ['/detail/1'] }
    );

    localStorage.setItem(TODO_LIST, JSON.stringify(['Todo 1', 'Todo 2']));

    const { container } = render(
      <TodoListProvider>
        <RouterProvider router={router} />
      </TodoListProvider>
    );

    const todoItem = screen.getByText('Todo 2');
    expect(todoItem).toBeInTheDocument();

    const button = screen.getByText('삭제');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('삭제 버튼 클릭시 삭제 잘되는지 확인, 홈으로 이동되는지 확인', () => {
    const TestComponent = () => {
      const location = useLocation();
      return <div>{location.pathname}</div>;
    };

    localStorage.setItem(TODO_LIST, JSON.stringify(['Todo1', 'Todo2']));

    render(
      <TodoListProvider>
        <MemoryRouter initialEntries={['/', '/detail/0']} initialIndex={1}>
          <TestComponent />
          <Routes>
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </MemoryRouter>
      </TodoListProvider>
    );

    const url = screen.getByText('/detail/0');
    expect(url).toBeInTheDocument();

    const todoItem = screen.getByText('Todo1');
    expect(todoItem).toBeInTheDocument();

    const button = screen.getByText('삭제');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(url.textContent).toBe('/');
    expect(todoItem).not.toBeInTheDocument();
    expect(button).not.toBeInTheDocument();

    expect(localStorage.getItem(TODO_LIST)).toBe(JSON.stringify(['Todo2']));
  });
});
