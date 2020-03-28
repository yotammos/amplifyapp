import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {IS_LOCAL} from "./utils/constants";

test('renders learn react link', () => {
  const { getByText } = render(<App isLocal={IS_LOCAL} />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
