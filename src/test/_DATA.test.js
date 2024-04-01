import { _getQuestions, _getUsers, _saveQuestion } from '../asset/_DATA';

jest.mock('timers', () => ({
  setTimeout: (fn, delay) => {
    fn();
  },
}));

test('_getUsers returns a promise that resolves with user data', async () => {
  const users = await _getUsers();
  expect(users).toEqual(
    expect.objectContaining({
      sarahedo: expect.any(Object),
      tylermcginnis: expect.any(Object),
      mtsamis: expect.any(Object),
      zoshikanlu: expect.any(Object),
    })
  );
});

jest.mock('timers', () => ({
  setTimeout: (fn, delay) => {
    fn();
  },
}));

test('_getQuestions returns a promise that resolves with question data', async () => {
  const questions = await _getQuestions();
  expect(questions).toEqual(
    expect.objectContaining({
      '8xf0y6ziyjabvozdd253nd': expect.any(Object),
      '6ni6ok3ym7mf1p33lnez': expect.any(Object),
    })
  );
});

test('_saveQuestion creates and saves a new question', async () => {
  const newQuestion = {
    optionOneText: 'Option A',
    optionTwoText: 'Option B',
    author: 'tylermcginnis',
  };

  const savedQuestion = await _saveQuestion(newQuestion);

  expect(savedQuestion).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      timestamp: expect.any(Number),
      author: 'tylermcginnis',
      optionOne: {
        text: 'Option A',
        votes: [],
      },
      optionTwo: {
        text: 'Option B',
        votes: [],
      },
    })
  );
});

test('_saveQuestion throws error for missing data', async () => {
  await expect(_saveQuestion({})).rejects.toEqual(
    'Please provide optionOneText, optionTwoText, and author'
  );
});
