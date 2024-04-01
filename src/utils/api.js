import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from '../asset/_DATA';

export const getInitialData = () => {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
};

export const saveQuestion = (info) => {
  return _saveQuestion(info);
};

export const saveQuestionAnswer = ({ authUser, qid, answer }) => {
  return _saveQuestionAnswer({ authUser, qid, answer });
};
