import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { TodoItem } from '../';

describe('<TodoItem />', () => {
  it('렌더링이 잘 되는지 테스트', () => {
    const { container } = render(<TodoItem label="default value" />);

    const todoItem = screen.getByText('default value');

    expect(todoItem).toBeInTheDocument();

    const deleteButton = screen.getByText('삭제');

    expect(deleteButton).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('삭제버튼 테스트', () => {
    const handleClick = jest.fn();

    render(<TodoItem label="default value" onDelete={handleClick} />);

    const deleteButton = screen.getByText('삭제');

    fireEvent.click(deleteButton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
