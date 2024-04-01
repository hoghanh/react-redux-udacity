import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

import { createStore } from 'redux';

import Login from '../components/Login';

const mockUsers = {
  sarahedo: {
    id: 'sarahedo',
    password: 'password123',
    name: 'Sarah Edo',
    avatarURL:
      'https://i.pinimg.com/originals/80/29/58/8029583119192523adf5396e0637cfbe.jpg',
    answers: {
      '8xf0y6ziyjabvozdd253nd': 'optionOne',
      '6ni6ok3ym7mf1p33lnez': 'optionOne',
      am8ehyc8byjqgar0jgpub9: 'optionTwo',
      loxhs1bqm25b708cmbf3g: 'optionTwo',
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9'],
  },
  zoshikanlu: {
    id: 'zoshikanlu',
    password: 'pass246',
    name: 'Zenobia Oshikanlu',
    avatarURL:
      'https://i.pinimg.com/originals/a5/09/2e/a5092e5e1f9d098d6a61f1dd1fc49454.jpg',
    answers: {
      xj352vofupe1dqz9emx13r: 'optionOne',
    },
    questions: [],
  },
};

const store = createStore((state = { users: mockUsers }, action) => state, {
  users: mockUsers,
});

test('renders login form and', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByText('Login to continue')).toBeInTheDocument();
  expect(screen.getByText('Login')).toBeInTheDocument();
});
