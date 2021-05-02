import React from 'react';
import { render, screen } from '@testing-library/react';
import App from 'App';

test('renders rechat logo', () => {
  render(<App />);
  const imgElement = screen.getByAltText(/logo-Rechat/i);
  expect(imgElement).toBeInTheDocument();
})