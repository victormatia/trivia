const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};
const test = 'test';

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action) {
  case test: return action;
  default: return state;
  }
};

export default userReducer;
