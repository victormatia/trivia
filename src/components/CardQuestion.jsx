import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Timer from './Timer';
import '../css/CardQuestion.css';
import { startTimer } from '../redux/store/actions/startTimer';
import { pauseTimer } from '../redux/store/actions/pauseTimer';
import { stopTimer } from '../redux/store/actions/stopTimer';

class CardQuestion extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      themeCorrect: '',
      themeIcorrect: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(startTimer());
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
    const { themeCorrect, themeIcorrect } = this.state;
    const allAnswers = [];
    const correct = {
      text: correctAnswer,
      testId: 'correct-answer',
      theme: themeCorrect,
    };

    const icorrects = incorrectAnswers.map((e, i) => ({
      text: e,
      testId: `wrong-answer-${i}`,
      theme: themeIcorrect,
    }));

    allAnswers.push(correct, ...icorrects);
    return this.shuffleArray(allAnswers);
  };

  applyThemeInAnswers = () => {
    this.setState({
      themeCorrect: 'correct-answer',
      themeIcorrect: 'incorrect-answer',
    });
  };

  removeThemeInAnswers = () => {
    this.setState({
      themeCorrect: '',
      themeIcorrect: '',
    });
  };

  onClick = () => {
    const { count } = this.state;
    const { dispatch } = this.props;
    const maxValue = 3;
    const maxTime = 2000;

    this.applyThemeInAnswers();
    dispatch(pauseTimer());

    setTimeout(() => {
      if (count <= maxValue) {
        this.removeThemeInAnswers();
        dispatch(stopTimer());
        this.setState((prevState) => ({
          count: prevState.count + 1,
        }));
        dispatch(startTimer());
      } else {
        this.setState({ count: 0 });
      }
    }, maxTime);
  };

  render() {
    const { questions, timer, isDisabledOptions } = this.props;
    const { count } = this.state;
    const currentQuestion = questions[count];

    return (
      <section>
        { timer === 'start' || timer === 'pause' ? <Timer /> : null }
        <section>
          <h4 data-testid="question-category">{ currentQuestion.category }</h4>
          <h5 data-testid="question-text">{ currentQuestion.question }</h5>
          <section data-testid="answer-options">
            {
              this.organizeAnswers(
                currentQuestion.correct_answer,
                currentQuestion.incorrect_answers,
              )
                .map((answers, i) => (
                  <button
                    disabled={ isDisabledOptions }
                    className={ answers.theme }
                    key={ i }
                    type="button"
                    onClick={ this.onClick }
                    data-testid={ answers.testId }
                  >
                    { answers.text }

                  </button>
                ))
            }
          </section>
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

const mapStateToProps = ({ questionsAndAnswer, timer, isDisabledOptions }) => ({
  questions: questionsAndAnswer,
  timer,
  isDisabledOptions,
});

export default connect(mapStateToProps)(CardQuestion);
