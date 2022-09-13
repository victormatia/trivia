import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAPIQuestions } from '../services/fetch';
import { getTokenLocalStorage, removeTokenLocalStorage } from '../services/localStorage';
import Header from '../components/Header';
import { saveQuestionsAndAnswer } from '../redux/store/actions/saveQuestionsAndAnswer';
import CardQuestion from '../components/CardQuestion';

class Game extends Component {
  async componentDidMount() {
    const token = await getTokenLocalStorage();
    const response = await fetchAPIQuestions(token);
    const { history, dispatch } = this.props;
    const tres = 3;
    if (response.response_code === tres) {
      await removeTokenLocalStorage();
      history.push('/');
    } else {
      const questionsAndAnswers = response.results.map((e) => ({
        difficulty: e.difficulty,
        category: e.category,
        question: e.question,
        correct_answer: e.correct_answer,
        incorrect_answers: e.incorrect_answers,
      }));
      dispatch(saveQuestionsAndAnswer(questionsAndAnswers));
    }
  }

  shuffleArray = (arr) => {
    // Essa função foi baseada no exemplo dado no site hora de codar: https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/

    for (let i = arr.length - 1; i > 0; i -= 1) {
      const radomNumber = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[radomNumber]] = [arr[radomNumber], arr[i]];
    }
    return arr;
  };

  organizeAnswers = (correctAnswer, incorrectAnswers) => {
    const allAnswers = [];
    const correct = {
      text: correctAnswer,
      testId: 'correct-answer',
      isCorrect: true,
    };

    const icorrects = incorrectAnswers.map((e, i) => ({
      text: e,
      testId: `wrong-answer-${i}`,
      isCorrect: false,
    }));

    allAnswers.push(correct, ...icorrects);
    return this.shuffleArray(allAnswers);
  };

  render() {
    const { questionsAndAnswer, currentQuestion } = this.props;
    const question = questionsAndAnswer[currentQuestion];
    return (
      <section>
        <Header />
        Game
        { questionsAndAnswer.length
          && <CardQuestion
            category={ question.category }
            difficulty={ question.difficulty }
            question={ question.question }
            answers={
              this.organizeAnswers(question.correct_answer, question.incorrect_answers)
            }
          />}
      </section>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.any,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = ({ questionsAndAnswer, currentQuestion }) => ({
  questionsAndAnswer,
  currentQuestion,
});

export default connect(mapStateToProps)(Game);
