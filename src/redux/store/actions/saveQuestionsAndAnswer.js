export const SAVE_QUESTIONS_ANSWERS = 'SAVE_QUESTIONS_ANSWERS';

export const saveQuestionsAndAnswer = (questionsAndAnswer) => ({
  type: SAVE_QUESTIONS_ANSWERS,
  questionsAndAnswer,
});
