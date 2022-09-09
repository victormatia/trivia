import { SAVE_GRAVATAR_EMAIL } from '../actions/saveGravatarEmail';
import { SAVE_QUESTIONS_ANSWERS } from '../actions/saveQuestionsAndAnswer';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '0',
  gravatarEmail: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_GRAVATAR_EMAIL: return {
    ...state,
    gravatarEmail: action.email,
    name: action.userName,
  };
  case SAVE_QUESTIONS_ANSWERS: return {
    ...state,
    questionsAndAnswer,
  };

  default: return state;
  }
};

export default userReducer;
