import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import NewPoll from '../components/NewPoll';
import { handleSaveQuestion } from '../actions/shared';
import { act } from 'react-dom/test-utils';

const mockState = {
  authUser: 'zoshikanlu',
};

const store = createStore((state = { authUser: mockState }, action) => state, {
  authUser: mockState,
});

jest.mock('../actions/shared', () => ({
  handleSaveQuestion: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-redux', () => ({
  connect: jest.fn(() => (Component) => Component),
}));

test('renders new poll form', async () => {
  render(
    <BrowserRouter>
      <NewPoll {...mockState} />
    </BrowserRouter>
  );

  expect(screen.getByText('Create a New Poll')).toBeInTheDocument();
  expect(screen.getByText('Enter option one...')).toBeInTheDocument();
  expect(screen.getByText('Enter option two...')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Submit/i })).toBeDisabled();
});

test('submit button is enable', async () => {
  render(
    <BrowserRouter>
      <NewPoll {...mockState} />
    </BrowserRouter>
  );

  const optionOneInput = screen.getByRole('textbox', {
    name: /option one/i,
  });
  const optionTwoInput = screen.getByRole('textbox', { name: /option two/i });
  const submitButton = screen.getByRole('button', { name: /submit/i });

  // eslint-disable-next-line testing-library/no-unnecessary-act
  act(() => {
    fireEvent.change(optionOneInput, { target: { value: 'Option A' } });
    fireEvent.change(optionTwoInput, { target: { value: 'Option B' } });
  });

  expect(submitButton).toBeEnabled();
});
