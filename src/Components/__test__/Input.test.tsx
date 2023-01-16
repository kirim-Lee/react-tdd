import { fireEvent, render, screen } from '@testing-library/react';

import { Input } from '../';

describe('<Input />', () => {
  it('렌더링이 잘 되는지 테스트', () => {
    const { container } = render(<Input value="default value" />);

    const input = screen.getByDisplayValue('default value');
    expect(input).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('placeholder 테스트', () => {
    render(<Input placeholder="default placeholder" />);
    const input = screen.getByPlaceholderText('default placeholder');

    expect(input).toBeInTheDocument();
  });

  it('인풋 입력 테스트', () => {
    render(<Input placeholder="default placeholder" />);

    const input = screen.getByPlaceholderText(
      'default placeholder'
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'study react' } });

    expect(input.value).toBe('study react');
  });

  it('onChange prop 주었을 경우', () => {
    const handleChange = jest.fn();

    render(<Input placeholder="default placeholder" onChange={handleChange} />);

    const input = screen.getByPlaceholderText(
      'default placeholder'
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'study react' } });

    expect(handleChange).toBeCalled();
    expect(handleChange).toBeCalledWith('study react');
  });
});
