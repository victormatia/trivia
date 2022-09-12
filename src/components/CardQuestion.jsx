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

class CardQuestion extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      showNextButton: false,
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
    const { themeCorrect, themeIncorrect } = this.props;
    const allAnswers = [];
    const correct = {
      text: correctAnswer,
      testId: 'correct-answer',
      theme: themeCorrect,
    };

    const icorrects = incorrectAnswers.map((e, i) => ({
      text: e,
      testId: `wrong-answer-${i}`,
      theme: themeIncorrect,
    }));

    allAnswers.push(correct, ...icorrects);
    return this.shuffleArray(allAnswers);
  };

  applyThemeInAnswers = (target) => {
    const { dispatch } = this.props;
    dispatch(applyThemes());

    console.log(target.className);
  };

  onClick = ({ target }) => {
    const { dispatch } = this.props;
    this.applyThemeInAnswers(target);
    dispatch(pauseTimer());
    this.setState({ showNextButton: true });

    // Muda para apróxima questão depois e 5s que o usuário respondeu --------

    // const { count } = this.state;
    // const maxValue = 3;
    // const maxTime = 5000;

    // setTimeout(() => {
    //   if (count <= maxValue) {
    //     this.removeThemeInAnswers();
    //     dispatch(stopTimer());
    //     this.setState((prevState) => ({
    //       count: prevState.count + 1,
    //     }));
    //     dispatch(startTimer());
    //   } else {
    //     this.setState({ count: 0 });
    //   }
    // }, maxTime);

    // -------------------------------------------------------------------------
  };

  skipQuestion = () => {
    const { dispatch } = this.props;
    const { count } = this.state;
    const maxValue = 3;

    if (count <= maxValue) {
      dispatch(removeThemes());
      // this.removeThemeInAnswers();
      dispatch(stopTimer());
      this.setState((prevState) => {
        dispatch(startTimer());
        return {
          count: prevState.count + 1,
        };
      });
    } else {
      this.setState({ count: 0 });
    }
  };

  render() {
    const { questions, timer, isDisabledOptions } = this.props;
    const { count, showNextButton } = this.state;
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
                    name={ currentQuestion.difficulty }
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

const mapStateToProps = ({
  questionsAndAnswer, timer, isDisabledOptions, themeIncorrect, themeCorrect,
}) => ({
  questions: questionsAndAnswer,
  timer,
  isDisabledOptions,
  themeIncorrect,
  themeCorrect,
});

export default connect(mapStateToProps)(CardQuestion);
// força atualização do avaliador
