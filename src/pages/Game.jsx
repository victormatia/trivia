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
        category: e.category,
        question: e.question,
        correct_answer: e.correct_answer,
        incorrect_answers: e.incorrect_answers,
      }));
      dispatch(saveQuestionsAndAnswer(questionsAndAnswers));
    }
  }

  render() {
    const { questionsAndAnswer } = this.props;
    return (
      <section>
        <Header />
        Game
        { questionsAndAnswer.length && <CardQuestion />}
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

const mapStateToProps = ({ questionsAndAnswer }) => ({
  questionsAndAnswer,
});

export default connect(mapStateToProps)(Game);
