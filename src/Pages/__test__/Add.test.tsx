import {
  RouterProvider,
  createMemoryRouter,
  useLocation,
} from 'react-router-dom';
import Add from '../Add';
import { fireEvent, render, screen } from '@testing-library/react';
import { TodoListProvider } from '../../Contexts/TodoList';

const TODO_LIST = 'TodoList';

describe('Add Page', () => {
  it('렌더링 테스트', () => {
    const router = createMemoryRouter([{ path: '*', element: <Add /> }], {
      initialEntries: ['/'],
      initialIndex: 0,
    });

    const { container } = render(<RouterProvider router={router} />);

    const input = screen.getByPlaceholderText(
      '할 일을 입력해 주세요'
    ) as HTMLInputElement;
    const button = screen.getByText('추가');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('할일 추가 후 루트 url로 이동하는지 확인', () => {
    const TestComponent = () => {
      const location = useLocation();
      return (
        <TodoListProvider>
          <div>{location.pathname}</div>
          <Add />
        </TodoListProvider>
      );
    };

    const router = createMemoryRouter([
      { path: '*', element: <TestComponent /> },
    ]);

    router.navigate('/add');

    render(<RouterProvider router={router} />);

    const pathName = screen.getByText('/add');
    expect(pathName).toBeInTheDocument();

    const input = screen.getByPlaceholderText(
      '할 일을 입력해 주세요'
    ) as HTMLInputElement;
    const button = screen.getByText('추가');

    fireEvent.change(input, { target: { value: 'study react 1' } });
    fireEvent.click(button);

    expect(pathName.textContent).toBe('/');
    expect(localStorage.getItem(TODO_LIST)).toBe(
      JSON.stringify(['study react 1'])
    );
  });
});
