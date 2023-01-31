import { render, screen } from '@testing-library/react';
import NotFound from '../NotFound';

describe('Not Found', () => {
  it('렌더링 테스트', () => {
    const { container } = render(<NotFound />);

    const message = screen.getByText('Not Found 😞');
    expect(message).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
