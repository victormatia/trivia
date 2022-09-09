import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAPIQuestions } from '../services/fetch';
import { getTokenLocalStorage, removeTokenLocalStorage } from '../services/localStorage';
import Header from '../components/Header';
import { saveQuestionsAndAnswer } from '../redux/store/actions/saveQuestionsAndAnswer';

class Game extends Component {
  async componentDidMount() {
    const token = await getTokenLocalStorage();
    const response = await fetchAPIQuestions(token);
    const { history, dispatch } = this.props;
    const tres = 3;
    console.log(response);
    if (response.response_code === tres) {
      await removeTokenLocalStorage();
      history.push('/');
    } else {
      const questionsAndAnswer = [
        {
          question: response.results[0].question,
          correct_answer: response.results[0].correct_answer,
          incorrect_answers: response.results[0].incorrect_answers,
        },
        {
          question: response.results[1].question,
          correct_answer: response.results[1].correct_answer,
          incorrect_answers: response.results[1].incorrect_answers,
        },
        {
          question: response.results[2].question,
          correct_answer: response.results[2].correct_answer,
          incorrect_answers: response.results[2].incorrect_answers,
        },
        {
          question: response.results[3].question,
          correct_answer: response.results[3].correct_answer,
          incorrect_answers: response.results[3].incorrect_answers,
        },
        {
          question: response.results[4].question,
          correct_answer: response.results[4].correct_answer,
          incorrect_answers: response.results[4].incorrect_answers,
        },
      ];
      dispatch(saveQuestionsAndAnswer(questionsAndAnswer));
    }
  }

  render() {
    return (
      <section>
        <Header />
        Game
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

Game.propTypes = {
  history: PropTypes.any,
}.isRequired;

export default connect()(Game);
