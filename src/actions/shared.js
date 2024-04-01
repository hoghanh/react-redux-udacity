import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api';
import { receiveQuestions, addAnswerToQuestion, addQuestion } from './question';
import { receiveUsers, addAnswerToUser, addQuestionToUser } from './user';

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}

export function saveAnswer(authUser, qid, answer) {
  return (dispatch) => {
    return saveQuestionAnswer({ authUser, qid, answer }).then(() => {
      dispatch(addAnswerToUser(authUser, qid, answer));
      dispatch(addAnswerToQuestion(authUser, qid, answer));
    });
  };
}

export function handleSaveQuestion(optionOneText, optionTwoText, author) {
  return (dispatch) => {
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      (question) => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question));
      }
    );
  };
}
