import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  it('렌더링이 잘 되는지 테스트', () => {
    const { container } = render(<App />);

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList).toBeInTheDocument();
    expect(toDoList.firstChild).toBeNull();

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeInTheDocument();
    const button = screen.getByText('추가');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('투두 아이템 추가 및 삭제 테스트', () => {
    render(<App />);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    const button = screen.getByText('추가');
    fireEvent.change(input, { target: { value: 'study react 1' } });
    fireEvent.click(button);

    const todoItem = screen.getByText('study react 1');
    expect(todoItem).toBeInTheDocument();
    const deleteButton = screen.getByText('삭제');
    expect(deleteButton).toBeInTheDocument();

    const toDoList = screen.getByTestId('toDoList');
    expect(toDoList.childElementCount).toBe(1);

    fireEvent.change(input, { target: { value: 'study react 2' } });
    fireEvent.click(button);

    const todoItem2 = screen.getByText('study react 2');
    expect(todoItem2).toBeInTheDocument();
    expect(toDoList.childElementCount).toBe(2);

    const deleteButtons = screen.getAllByText('삭제');
    fireEvent.click(deleteButtons[0]);

    expect(todoItem).not.toBeInTheDocument();
    expect(toDoList.childElementCount).toBe(1);
  });

  it('로컬스토리지 데이터 투두리스트와 연동 확인', () => {
    localStorage.setItem(
      'TodoList',
      JSON.stringify(['todo 1', 'todo 2', 'todo 3'])
    );

    render(<App />);

    expect(screen.getByText('todo 1')).toBeInTheDocument();
    expect(screen.getByText('todo 2')).toBeInTheDocument();
    expect(screen.getByText('todo 3')).toBeInTheDocument();
    expect(screen.getAllByText('삭제').length).toBe(3);
  });
});
