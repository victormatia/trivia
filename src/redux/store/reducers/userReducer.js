import { SAVE_GRAVATAR_EMAIL } from '../actions/saveGravatarEmail';

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

  default: return state;
  }
};

export default userReducer;
