export const COUNT_SCORE = 'COUNT_SCORE';

export const countScore = (difficulty, isCorrect) => ({
  type: COUNT_SCORE,
  isCorrect,
  difficulty,
});
