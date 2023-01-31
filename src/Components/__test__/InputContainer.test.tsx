import { fireEvent, render, screen } from '@testing-library/react';
import { InputContainer } from '../InputContainer';
import { TodoListProvider } from '../../Contexts/TodoList';

const TODO_LIST = 'TodoList';

describe('<InputContainer />', () => {
  it('렌더링 테스트', () => {
    const { container } = render(<InputContainer />);

    const input = screen.getByPlaceholderText('할 일을 입력해 주세요');
    expect(input).toBeInTheDocument();

    const button = screen.getByText('추가');
    expect(button).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('추가버튼을 눌렀을때 값이 초기화 되는지 확인', () => {
    render(<InputContainer />);

    const input = screen.getByPlaceholderText(
      '할 일을 입력해 주세요'
    ) as HTMLInputElement;
    const button = screen.getByText('추가');

    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: 'study react 1' } });
    expect(input.value).toBe('study react 1');

    fireEvent.click(button);
    expect(input.value).toBe('');
  });

  it('컨텍스트와 연동된 부분을 테스트', () => {
    render(
      <TodoListProvider>
        <InputContainer />
      </TodoListProvider>
    );

    const input = screen.getByPlaceholderText(
      '할 일을 입력해 주세요'
    ) as HTMLInputElement;
    const button = screen.getByText('추가');

    expect(localStorage.getItem(TODO_LIST)).toBeNull();

    fireEvent.change(input, { target: { value: 'study react 1' } });
    fireEvent.click(button);
    expect(localStorage.getItem(TODO_LIST)).toBe(
      JSON.stringify(['study react 1'])
    );
  });

  it('추가 버튼을 눌렀을 때 props으로 전달된 함수 실행하는지 확인', () => {
    const handleClick = jest.fn();
    render(<InputContainer onAdd={handleClick} />);

    const input = screen.getByPlaceholderText(
      '할 일을 입력해 주세요'
    ) as HTMLInputElement;
    const button = screen.getByText('추가');

    expect(handleClick).toHaveBeenCalledTimes(0);

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(0);

    fireEvent.change(input, { target: { value: 'study react 1' } });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
