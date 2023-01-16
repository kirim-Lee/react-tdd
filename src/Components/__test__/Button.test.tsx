import { fireEvent, render, screen } from '@testing-library/react';
import 'jest-styled-components';

import { Button } from '../';

describe('<Button />', () => {
  it('정확하게 렌더링 되는지 테스트', () => {
    const { container } = render(<Button label="Button Test" />);

    const label = screen.getByText('Button Test');

    expect(label).toBeInTheDocument(); // 문서에 존재하는지 확인

    const parent = label.parentElement; //

    expect(parent).toHaveStyleRule('background-color', '#304ffe');
    expect(parent).toHaveStyleRule('background-color', '#1e40ff', {
      modifier: ':hover',
    });

    expect(container).toMatchSnapshot();
  });

  it('backgroundColor, hoverColor props test', () => {
    const backgroundColor = '#ff1744';
    const hoverColor = '#f01440';

    render(
      <Button
        label="Button Test"
        backgroundColor={backgroundColor}
        hoverColor={hoverColor}
      />
    );

    const parent = screen.getByText('Button Test').parentElement;
    expect(parent).toHaveStyleRule('background-color', backgroundColor);
    expect(parent).toHaveStyleRule('background-color', hoverColor, {
      modifier: ':hover',
    });
  });

  it('클릭이벤트 테스트', () => {
    const handleClick = jest.fn();
    render(<Button label="Button Test" onClick={handleClick} />);

    const label = screen.getByText('Button Test');
    expect(handleClick).toHaveBeenCalledTimes(0);
    fireEvent.click(label);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
