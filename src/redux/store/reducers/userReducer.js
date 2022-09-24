import { APPLY_THEMES } from '../actions/applyThemes';
import { DISABLE_OPTIONS } from '../actions/disableOptions';
import { PAUSE_TIMER } from '../actions/pauseTimer';
import { REMOVE_THEMES } from '../actions/removeThemes';
import { RESTART_SCORE } from '../actions/restartScore';
import { SAVE_GRAVATAR_EMAIL } from '../actions/saveGravatarEmail';
import { SAVE_QUESTIONS_ANSWERS } from '../actions/saveQuestionsAndAnswer';
import { SET_SCORE } from '../actions/setScore';
import { SKIP_QUESTION } from '../actions/skipQuestion';
import { START_TIMER } from '../actions/startTimer';
import { STOP_TIMER } from '../actions/stopTimer';
import { SET_ASSERTIONS } from '../actions/updateAssertions';
import { UPDATE_TIME } from '../actions/updateTime';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  timer: '',
  currentTime: 30,
  isDisabledOptions: false,
  currentQuestion: 0,
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
    questionsAndAnswer: [...action.questionsAndAnswer],
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
  case SKIP_QUESTION: {
    const quatro = 4;
    if (state.currentQuestion >= quatro) {
      return { ...state, currentQuestion: 0 };
    }
    return { ...state, currentQuestion: state.currentQuestion + 1 };
  }
  case SET_SCORE: return { ...state, score: state.score + action.score };
  case SET_ASSERTIONS: return { ...state, assertions: state.assertions + 1 };
  case RESTART_SCORE: return {
    ...state,
    score: 0,
    assertions: 0 };
  default: return state;
  }
};

export default userReducer;
