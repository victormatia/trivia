import { APPLY_THEMES } from '../actions/applyThemes';
import { DISABLE_OPTIONS } from '../actions/disableOptions';
import { PAUSE_TIMER } from '../actions/pauseTimer';
import { REMOVE_THEMES } from '../actions/removeThemes';
import { SAVE_GRAVATAR_EMAIL } from '../actions/saveGravatarEmail';
import { SAVE_QUESTIONS_ANSWERS } from '../actions/saveQuestionsAndAnswer';
import { START_TIMER } from '../actions/startTimer';
import { STOP_TIMER } from '../actions/stopTimer';
import { UPDATE_TIME } from '../actions/updateTime';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '0',
  gravatarEmail: '',
  timer: '',
  currentTime: 30,
  isDisabledOptions: false,
  themeCorrect: '',
  themeIncorrect: '',
  questionsAndAnswer: [],
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
    questionsAndAnswer: action.questionsAndAnswer,
  };
  case START_TIMER: return { ...state, timer: 'start' };
  case PAUSE_TIMER: return { ...state, timer: 'pause' };
  case STOP_TIMER: return { ...state, timer: 'stop' };
  case DISABLE_OPTIONS: return { ...state, isDisabledOptions: true };
  case UPDATE_TIME: return { ...state, currentTime: action.time };
  case APPLY_THEMES: return {
    ...state, themeCorrect: 'correct-answer', themeIncorrect: 'incorrect-answer' };
  case REMOVE_THEMES: return {
    ...state, themeCorrect: '', themeIncorrect: '' };

  default: return state;
  }
};

export default userReducer;
