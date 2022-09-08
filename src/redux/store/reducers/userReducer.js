const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  console.log(action.type);
  return state;
};

export default userReducer;
