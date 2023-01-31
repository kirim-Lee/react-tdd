import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { TodoItem } from '../';
import { MemoryRouter, useLocation } from 'react-router-dom';

describe('<TodoItem />', () => {
  it('렌더링이 잘 되는지 테스트', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <TodoItem id={1} label="default value" />
      </MemoryRouter>
    );

    const todoItem = screen.getByText('default value');

    expect(todoItem).toBeInTheDocument();

    const deleteButton = screen.getByText('삭제');

    expect(deleteButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('삭제버튼 테스트', () => {
    const handleClick = jest.fn();

    render(
      <MemoryRouter initialEntries={['/']}>
        <TodoItem id={1} label="default value" onDelete={handleClick} />
      </MemoryRouter>
    );

    const deleteButton = screen.getByText('삭제');

    fireEvent.click(deleteButton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('라벨 클릭시 /detail 로 이동되는지 확인', () => {
    const TestComponent = () => {
      const location = useLocation();
      return (
        <div>
          <div>{location.pathname}</div>
          <TodoItem id={1} label="default value" />
        </div>
      );
    };

    render(
      <MemoryRouter initialEntries={['/']}>
        <TestComponent />
      </MemoryRouter>
    );

    const pathName = screen.getByText('/');
    expect(pathName).toBeInTheDocument();

    const todoItem = screen.getByText('default value');
    fireEvent.click(todoItem);
    expect(pathName.textContent).toBe('/detail/1');
  });
});
