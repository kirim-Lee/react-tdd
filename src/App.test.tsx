import { render, screen } from '@testing-library/react';
import App from './App';

test('render learn react', () => {
  render(<App />);
  const linkEl = screen.getByText(/learn react/i);
  expect(linkEl).toBeInTheDocument();
});
