import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the quiz score', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Score:/i);
  expect(linkElement).toBeInTheDocument();
});
