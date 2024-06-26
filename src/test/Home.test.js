import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';

import Home from '../components/Home';

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
  mtsamis: {
    id: 'mtsamis',
    password: 'xyz123',
    name: 'Mike Tsamis',
    avatarURL:
      'https://i.pinimg.com/originals/01/b2/86/01b286554c4a16f9e9d67d432dc95e8d.jpg',
    answers: {
      xj352vofupe1dqz9emx13r: 'optionOne',
      vthrdm985a262al8qx3do: 'optionTwo',
      '6ni6ok3ym7mf1p33lnez': 'optionOne',
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
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
    questions: ['6ni6ok3ym7mf1p33lnez'],
  },
};

const mockQuestions = {
  am8ehyc8byjqgar0jgpub9: {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'sarahedo',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'conduct a release retrospective 1 week after a release',
    },
    optionTwo: {
      votes: ['sarahedo'],
      text: 'conduct release retrospectives quarterly',
    },
  },
  loxhs1bqm25b708cmbf3g: {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'tylermcginnis',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'have code reviews conducted by peers',
    },
    optionTwo: {
      votes: ['sarahedo'],
      text: 'have code reviews conducted by managers',
    },
  },
  vthrdm985a262al8qx3do: {
    id: 'vthrdm985a262al8qx3do',
    author: 'tylermcginnis',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['tylermcginnis'],
      text: 'take a course on ReactJS',
    },
    optionTwo: {
      votes: ['mtsamis'],
      text: 'take a course on unit testing with Jest',
    },
  },
};

const mockState = {
  authUser: 'mtsamis',
  questions: mockQuestions,
  users: mockUsers,
};

const store = createStore((state = { users: mockUsers }, action) => state, {
  users: mockUsers,
});

jest.mock('react-redux', () => ({
  connect: jest.fn(() => (Component) => Component),
}));

test('renders unanswered questions first', () => {
  render(
    <BrowserRouter>
      <Home {...mockState} />
    </BrowserRouter>
  );

  const unansweredQuestion = screen.getByText('Sarah Edo asked:');
  expect(unansweredQuestion).toBeInTheDocument();
});

test('shows number of "Vote Poll" button for unanswered questions in home screen', () => {
  render(
    <BrowserRouter>
      <Home {...mockState} />
    </BrowserRouter>
  );

  const voteButtons = screen.getAllByText('Vote Poll');
  expect(voteButtons).toHaveLength(3);
});

test('shows "Result" button for answered questions', () => {
  const userDispatch = jest.fn();
  render(
    <BrowserRouter>
      <Home {...mockState} dispatch={userDispatch} />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText('Answered'));

  const resultButton = screen.getAllByText('Result');
  expect(resultButton).toHaveLength(3);
});
