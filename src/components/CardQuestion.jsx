import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Timer from './Timer';
import '../css/CardQuestion.css';
import { startTimer } from '../redux/store/actions/startTimer';
import { pauseTimer } from '../redux/store/actions/pauseTimer';
import { stopTimer } from '../redux/store/actions/stopTimer';
import { applyThemes } from '../redux/store/actions/applyThemes';
import { removeThemes } from '../redux/store/actions/removeThemes';
import { skipQuestion } from '../redux/store/actions/skipQuestion';
import { updateScore } from '../redux/store/actions/setScore';
import { updateAssertions } from '../redux/store/actions/updateAssertions';

class CardQuestion extends Component {
  constructor() {
    super();
    this.state = {
      showNextButton: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(startTimer());
  }

  onClick = ({ target }) => {
    const { dispatch } = this.props;
    dispatch(applyThemes());
    dispatch(pauseTimer());
    this.setState({ showNextButton: true });

    if (target.value === 'correct-answer') {
      const { currentTime } = this.props;
      let valorDifficulty = 0;
      if (target.name === 'hard') {
        const tres = 3;
        valorDifficulty = tres;
      } if (target.name === 'medium') {
        valorDifficulty = 2;
      } if (target.name === 'easy') {
        valorDifficulty = 1;
      }
      const dez = 10;
      const score = dez + (currentTime * valorDifficulty);
      dispatch(updateScore(score));
      dispatch(updateAssertions());
    }
  };

  skipQuestion = async () => {
    const { dispatch, currentQuestion } = this.props;
    const maxValue = 4;
    await dispatch(stopTimer());
    dispatch(removeThemes());

    if (currentQuestion < maxValue) {
      dispatch(skipQuestion());
      dispatch(startTimer());
      console.log('proxima pergunta');
    } else {
      const { history } = this.props;
      console.log('vai pra feedback');
      history.push('/feedback');
      dispatch(skipQuestion());
    }
  };

  render() {
    const { question, difficulty, category, answers, timer,
      isDisabledOptions, themeIncorrect, themeCorrect } = this.props;
    const { showNextButton } = this.state;

    return (
      <section>
        { timer === 'start' || timer === 'pause' ? <Timer /> : null }
        <section>
          <h4 data-testid="question-category">{ category }</h4>
          <h5 data-testid="question-text">{ question }</h5>
          <section data-testid="answer-options">
            {
              answers.map((answer, i) => (
                <button
                  name={ difficulty }
                  disabled={ isDisabledOptions }
                  className={ answer.isCorrect ? themeCorrect : themeIncorrect }
                  key={ i }
                  type="button"
                  onClick={ this.onClick }
                  value={ answer.testId }
                  data-testid={ answer.testId }
                >
                  { answer.text }

                </button>
              ))
            }
          </section>
          { showNextButton && (
            <button
              onClick={ this.skipQuestion }
              data-testid="btn-next"
              type="button"
            >
              Next

            </button>
          ) }
        </section>
      </section>
    );
  }
}

CardQuestion.propTypes = {
  questionsAndAnswer: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = ({ player: { timer, currentTime, isDisabledOptions, themeCorrect,
  themeIncorrect, currentQuestion } }) => ({
  timer,
  isDisabledOptions,
  themeCorrect,
  themeIncorrect,
  currentQuestion,
  currentTime,
});

export default connect(mapStateToProps)(CardQuestion);
// força atualização do avaliador
