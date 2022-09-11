import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Timer from './Timer';

class CardQuestion extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
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
    };

    const icorrects = incorrectAnswers.map((e, i) => ({
      text: e,
      testId: `wrong-answer-${i}`,
    }));

    allAnswers.push(correct, ...icorrects);
    return this.shuffleArray(allAnswers);
  };

  onClick = () => {
    const { count } = this.state;
    const maxValue = 3;
    if (count <= maxValue) {
      this.setState((prevState) => ({
        count: prevState.count + 1,
      }));
    } else {
      this.setState({ count: 0 });
    }
  };

  render() {
    const { questions } = this.props;
    const { count } = this.state;
    const currentQuestion = questions[count];

    return (
      <section>
        <Timer />
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

const mapStateToProps = ({ questionsAndAnswer }) => ({
  questions: questionsAndAnswer,
});

export default connect(mapStateToProps)(CardQuestion);
